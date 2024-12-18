import appConf from '@/api/conf/app.conf';
import TokenUtil from './token.util';
import ApiModelUtil from './api-model.util';
import ApiResponseDto from '../api/dto/api-response.dto';

export default class WsModelUtil {
  protected actions: Record<string, Function> = {};
  protected ws: WebSocket;
  protected initialized: boolean = false;
  private lastSent: any;
  private onRefresh: boolean = false;
  public ON_OPEN_ACTION = '_system_on_open';
  public ON_ERROR_ACTION = '_system_on_error';
  public ON_CLOSE_ACTION = '_system_on_close';
  public RESPONSE_HANDLER = '_system_response_handler';

  constructor(
    public url: string,
    public autoRestart: boolean,
  ) {}

  async init() {
    if (this.initialized) return;
    this.ws = new WebSocket(
      `${appConf.proto}://${appConf.endpoint}/${this.url}`,
    );

    this.ws.onerror = (err) => this.onError(err);
    this.ws.onclose = (data) => this.onClose(data);
    this.ws.onmessage = (msg) => this.onMessage(msg);

    this.initialized = true;

    return await new Promise((resolve) => {
      this.ws.onopen = () => {
        resolve(true);
        this.onOpen();
      };
    });
  }

  protected onOpen() {
    if (this.actions[this.ON_OPEN_ACTION]) this.actions[this.ON_OPEN_ACTION]();
  }

  close() {
    try {
      this.ws.close();
    } catch (e) {
      console.log(e);
    }
    this.initialized = false;
  }

  restart() {
    this.close();
    this.init();
  }

  register(actionName: string, handler: Function) {
    this.actions[actionName] = handler;
  }

  registerOnOpen(handler: Function) {
    this.actions[this.ON_OPEN_ACTION] = handler;
  }

  registerOnError(handler: Function) {
    this.actions[this.ON_ERROR_ACTION] = handler;
  }

  registerOnClose(handler: Function) {
    this.actions[this.ON_CLOSE_ACTION] = handler;
  }

  registerResponseHandler(handler: Function) {
    this.actions[this.RESPONSE_HANDLER] = handler;
  }

  send(route: string, message: any) {
    const authData = TokenUtil.getAccess();
    this.lastSent = {
      route,
      data: message,
    };
    this.ws.send(
      JSON.stringify({
        ...this.lastSent,
        headers: {
          Authorization: `Bearer ${authData}`,
        },
      }),
    );
  }

  async sendAwaited(awaited_type: string, route: string, message: any) {
    const authData = TokenUtil.getAccess();
    this.lastSent = {
      route,
      data: message,
    };

    const awaited = await new Promise<ApiResponseDto<any>>((resolve) => {
      this.register(awaited_type, (msg) => {
        resolve(new ApiResponseDto(true, msg, null));
      });
      this.ws.send(
        JSON.stringify({
          ...this.lastSent,
          headers: {
            Authorization: `Bearer ${authData}`,
            awaited: true,
            awaited_type,
          },
        }),
      );
      setTimeout(() => {
        resolve(new ApiResponseDto(false, null, null));
      }, 1000);
    });

    delete this.actions[awaited_type];

    return awaited;
  }

  private async refreshAndExecuteLast() {
    const apiModel = new ApiModelUtil('');
    await apiModel.refresh();
    this.send(this.lastSent.route, this.lastSent.data);
  }

  protected onClose(data) {
    if (this.actions[this.ON_CLOSE_ACTION])
      this.actions[this.ON_CLOSE_ACTION](data);

    if (this.autoRestart) this.restart();
  }

  protected onError(err) {
    if (this.actions[this.ON_ERROR_ACTION])
      this.actions[this.ON_ERROR_ACTION](err);

    if (this.autoRestart) this.restart();
    else this.close();
  }

  protected onMessage(message) {
    const data = JSON.parse(message.data);
    if (data.awaited_type) {
      this.actions[data.awaited_type](data);
      return;
    }

    if (data.type) {
      if (this.actions[data.type]) this.actions[data.type](data);
    } else {
      if (data.status && data.status == 403 && !this.onRefresh) {
        this.onRefresh = true;
        this.refreshAndExecuteLast();
      } else {
        this.onRefresh = false;
        if (this.actions[this.RESPONSE_HANDLER])
          this.actions[this.RESPONSE_HANDLER](data);
      }
    }
  }
}
