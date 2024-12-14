import appConf from "@/api/conf/app.conf";
import TokenUtil from "./token.util";
import ApiModelUtil from './api-model.util';

export default class WsModelUtil {
    protected actions: Record<string, Function> = {}
    protected ws: WebSocket
    protected initialized: boolean = false;
    private lastSent: any;
    private onRefresh: boolean = false;
    public ON_OPEN_ACTION = "_system_on_open"
    public ON_ERROR_ACTION = "_system_on_error"
    public ON_CLOSE_ACTION = "_system_on_close"
    public RESPONSE_HANDLER = "_system_response_handler"

    constructor(
        public url: string,
        public autoRestart: boolean
    ) { }

    init() {
        if (this.initialized) return;
        this.ws = new WebSocket(`${appConf.proto}://${appConf.endpoint}/${this.url}`);

        this.ws.onopen = this.onOpen;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
        this.ws.onmessage = this.onMessage;
    
        this.initialized = true;
    }

    protected onOpen() {
        this.actions[this.ON_OPEN_ACTION]()
    }

    close() {
        if (!this.ws.CLOSED)
            this.ws.close()
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
        this.actions[this.RESPONSE_HANDLER] = handler
    }

    send(route: string, message: any) {
        const authData = TokenUtil.getAccess()
        this.lastSent = {
            route,
            data: message
        }
        this.ws.send(JSON.stringify({
            ...this.lastSent, 
            headers: {
                Authorization: authData
            },
        }))
    }

    private async refreshAndExecuteLast() {
        const apiModel = new ApiModelUtil("");
        await apiModel.refresh()
        this.send(this.lastSent.route, this.lastSent.data)
    }

    protected onClose() {
        if (this.actions[this.ON_CLOSE_ACTION])
            this.actions[this.ON_CLOSE_ACTION]();

        if (this.autoRestart)
            this.restart();
    }

    protected onError(err) {
        if (this.actions[this.ON_ERROR_ACTION])
            this.actions[this.ON_ERROR_ACTION](err);

        if (this.autoRestart)
            this.restart()
        else
            this.close();
    }

    protected onMessage(message) {
        const data = JSON.parse(message);
        if (data.type) {
            if (this.actions[data.type])
                this.actions[data.type](data);
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