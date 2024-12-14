// @ts-nocheck
import { describe, beforeEach, it, expect, vi } from 'vitest';
import WsModelUtil from '@/utils/ws-model.util';
import TokenUtil from '@/utils/token.util';
import ApiModelUtil from '@/utils/api-model.util';

class WebSocketMock {}

vi.mock('@/utils/token.util.ts', () => ({
  default: {
    getAccess: vi.fn(() => 'token'),
  },
}));

vi.mock('@/utils/api-model.util.ts', () => {
  class ApiModelUtilMock {
    static RefreshStatic = vi.fn();

    public refresh = ApiModelUtilMock.RefreshStatic;
  }

  return {
    default: ApiModelUtilMock,
  };
});

describe('WsModelUtil tests', () => {
  let wsModelUtil: WsModelUtil;
  beforeEach(() => {
    vi.stubGlobal('WebSocket', WebSocketMock);
    wsModelUtil = new WsModelUtil('test', true);
  });

  it('Test constructing', () => {
    expect(wsModelUtil.autoRestart).toBe(true);
    expect(wsModelUtil.url).toBe('test');
  });

  it('Test initilization', () => {
    wsModelUtil.onOpen = 'onopen';
    wsModelUtil.onError = 'onerror';
    wsModelUtil.onClose = 'onclose';
    wsModelUtil.onMessage = 'onmessage';

    wsModelUtil.init();

    expect(wsModelUtil.initialized).toBe(true);
    expect(wsModelUtil.ws.onopen).toBe(wsModelUtil.onOpen);
    expect(wsModelUtil.ws.onerror).toBe(wsModelUtil.onError);
    expect(wsModelUtil.ws.onclose).toBe(wsModelUtil.onClose);
    expect(wsModelUtil.ws.onmessage).toBe(wsModelUtil.onMessage);
  });

  it('Test onOpen', () => {
    wsModelUtil.actions[wsModelUtil.ON_OPEN_ACTION] = vi.fn();

    wsModelUtil.onOpen();

    expect(wsModelUtil.actions[wsModelUtil.ON_OPEN_ACTION]).toBeCalled();
  });

  describe('Test closing', () => {
    it('if closed', () => {
      wsModelUtil.ws = {
        CLOSED: true,
        close: vi.fn(),
      };

      wsModelUtil.close();

      expect(wsModelUtil.initialized).toBe(false);
      expect(wsModelUtil.ws.close).toBeCalledTimes(0);
    });

    it('if open', () => {
      wsModelUtil.ws = {
        CLOSED: false,
        close: vi.fn(),
      };

      wsModelUtil.close();

      expect(wsModelUtil.initialized).toBe(false);
      expect(wsModelUtil.ws.close).toBeCalledTimes(1);
    });
  });

  it('test restart', () => {
    wsModelUtil.close = vi.fn();
    wsModelUtil.init = vi.fn();

    wsModelUtil.restart();

    expect(wsModelUtil.close).toBeCalledTimes(1);
    expect(wsModelUtil.init).toBeCalledTimes(1);
  });

  describe('handlers` registerators test', () => {
    it('unified', () => {
      wsModelUtil.actions = {};
      wsModelUtil.register('action', 'func');

      expect(Object.keys(wsModelUtil.actions)).toContain('action');
      expect(wsModelUtil.actions['action']).toBe('func');
    });

    it('onopen', () => {
      wsModelUtil.actions = {};
      wsModelUtil.registerOnOpen('func');

      expect(Object.keys(wsModelUtil.actions)).toContain(
        wsModelUtil.ON_OPEN_ACTION,
      );
      expect(wsModelUtil.actions[wsModelUtil.ON_OPEN_ACTION]).toBe('func');
    });

    it('onerror', () => {
      wsModelUtil.actions = {};
      wsModelUtil.registerOnError('func');

      expect(Object.keys(wsModelUtil.actions)).toContain(
        wsModelUtil.ON_ERROR_ACTION,
      );
      expect(wsModelUtil.actions[wsModelUtil.ON_ERROR_ACTION]).toBe('func');
    });

    it('onclose', () => {
      wsModelUtil.actions = {};
      wsModelUtil.registerOnClose('func');

      expect(Object.keys(wsModelUtil.actions)).toContain(
        wsModelUtil.ON_CLOSE_ACTION,
      );
      expect(wsModelUtil.actions[wsModelUtil.ON_CLOSE_ACTION]).toBe('func');
    });

    it('response', () => {
      wsModelUtil.actions = {};
      wsModelUtil.registerResponseHandler('func');

      expect(Object.keys(wsModelUtil.actions)).toContain(
        wsModelUtil.RESPONSE_HANDLER,
      );
      expect(wsModelUtil.actions[wsModelUtil.RESPONSE_HANDLER]).toBe('func');
    });
  });

  it('test sending', () => {
    wsModelUtil.ws = {
      send: vi.fn(),
    };
    const lastSent = {
      route: 'route',
      data: 'message',
    };

    wsModelUtil.send('route', 'message');

    expect(wsModelUtil.lastSent).toEqual(lastSent);
    expect(TokenUtil.getAccess).toBeCalled();
    expect(wsModelUtil.ws.send).toBeCalledWith(
      JSON.stringify({
        ...lastSent,
        headers: {
          Authorization: 'token',
        },
      }),
    );
  });

  it('test refresh and execute last', async () => {
    wsModelUtil.lastSent = { route: 'test', data: 'data' };
    wsModelUtil.send = vi.fn();

    await wsModelUtil.refreshAndExecuteLast();

    expect(ApiModelUtil.RefreshStatic).toBeCalled();
    expect(wsModelUtil.send).toBeCalledWith('test', 'data');
  });

  describe('Test handlers', () => {
    beforeEach(() => {
      wsModelUtil.actions[wsModelUtil.ON_CLOSE_ACTION] = vi.fn();
      wsModelUtil.actions[wsModelUtil.ON_ERROR_ACTION] = vi.fn();
    });

    describe('on close', () => {
      it('with autorestart', () => {
        wsModelUtil.autoRestart = true;
        wsModelUtil.restart = vi.fn();

        wsModelUtil.onClose();

        expect(wsModelUtil.actions[wsModelUtil.ON_CLOSE_ACTION]).toBeCalled();
        expect(wsModelUtil.restart).toBeCalled();
      });

      it('without autorestart', () => {
        wsModelUtil.autoRestart = false;
        wsModelUtil.restart = vi.fn();

        wsModelUtil.onClose();

        expect(wsModelUtil.actions[wsModelUtil.ON_CLOSE_ACTION]).toBeCalled();
        expect(wsModelUtil.restart).toBeCalledTimes(0);
      });
    });

    describe('on error', () => {
      beforeEach(() => {
        wsModelUtil.restart = vi.fn();
        wsModelUtil.close = vi.fn();
      });
      it('with autorestart', () => {
        wsModelUtil.autoRestart = true;

        wsModelUtil.onError();

        expect(wsModelUtil.actions[wsModelUtil.ON_ERROR_ACTION]).toBeCalled();
        expect(wsModelUtil.restart).toBeCalled();
        expect(wsModelUtil.close).toBeCalledTimes(0);
      });

      it('without autorestart', () => {
        wsModelUtil.autoRestart = false;
        wsModelUtil.restart = vi.fn();

        wsModelUtil.onError();

        expect(wsModelUtil.actions[wsModelUtil.ON_ERROR_ACTION]).toBeCalled();
        expect(wsModelUtil.close).toBeCalled();
        expect(wsModelUtil.restart).toBeCalledTimes(0);
      });
    });

    describe('on message', () => {
      it('with type', () => {
        const type = 'type';
        const message = JSON.stringify({ type });
        wsModelUtil.actions[type] = vi.fn();

        wsModelUtil.onMessage(message);

        expect(wsModelUtil.actions[type]).toBeCalledWith({ type });
      });

      describe('without type', () => {
        it('success or no status', () => {
          wsModelUtil.onRefresh = true;
          wsModelUtil.actions[wsModelUtil.RESPONSE_HANDLER] = vi.fn();
          const message = JSON.stringify({ msg: 'msg' });

          wsModelUtil.onMessage(message);

          expect(wsModelUtil.onRefresh).toBe(false);
          expect(
            wsModelUtil.actions[wsModelUtil.RESPONSE_HANDLER],
          ).toBeCalledWith({ msg: 'msg' });
        });

        it('403 status (not in refresh)', () => {
          wsModelUtil.onRefresh = false;
          wsModelUtil.refreshAndExecuteLast = vi.fn();
          const message = JSON.stringify({ status: 403 });

          wsModelUtil.onMessage(message);

          expect(wsModelUtil.refreshAndExecuteLast).toBeCalled();
          expect(wsModelUtil.onRefresh).toBe(true);
        });
      });
    });
  });
});
