import { describe, beforeEach, it, expect, vi } from 'vitest';
import ApiModelUtil from '@/utils/api-model.util.ts';
import ApiRequestDto from '@/api/dto/api-request.dto.ts';
import LoggerUtil from '@/utils/logger/logger.util.ts';
import axios from 'axios';
import appConf from '@/api/conf/app.conf.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import TokenUtil from '@/utils/token.util.ts';
import router from '@/router';

vi.mock('@/utils/logger/logger.util', () => {
  return {
    default: {
      debug: vi.fn(),
      debugPrefixed: vi.fn(),
    },
  };
});

vi.mock('@/utils/token.util', () => {
  return {
    default: {
      getAccess: vi.fn(() => 'token'),
      getRefresh: vi.fn(() => 'refresh'),
      setAuthorized: vi.fn(),
      logout: vi.fn(),
      login: vi.fn(),
    },
  };
});

vi.mock('axios', () => {
  return {
    default: vi.fn(
      () => new Promise((resolve) => resolve({ getData: () => 'tokens' })),
    ),
  };
});

vi.mock('@/api/dto/api-response.dto', async () => {
  class ApiResponseDtoMock {
    constructor(success, data, error) {
      return { success, data, error };
    }
    static buildFromError = vi.fn(() => ({
      getError: () => ({ httpStatusCode: 401 }),
    }));
    static networkError = vi.fn();
    static successResponse = vi.fn(() => 'response');
  }
  return {
    default: ApiResponseDtoMock,
  };
});

vi.mock('@/router/index', () => {
  return {
    default: {
      push: vi.fn(),
    },
  };
});

describe('Base ApiModelUtil class tests', () => {
  let apiModelUtil: ApiModelUtil;
  const token = 'token';
  beforeEach(() => {
    apiModelUtil = new ApiModelUtil('/baseEndpoint');
  });

  it('Test apiModelUtil creation', () => {
    expect(apiModelUtil).toEqual({
      baseEndpoint: '/baseEndpoint',
      baseEndpointBuffer: '',
      onRefresh: null,
    });
  });

  it('Test buildUrl', () => {
    const endpoint = '/endpoint';
    //@ts-ignore
    const baseUrl = `${appConf.endpoint}${apiModelUtil.baseEndpoint}${endpoint}`
      .replace('//', '/')
      .replace('//', '/');
    const newUrl = `${appConf.proto}://${baseUrl}`;

    //@ts-ignore
    const url = apiModelUtil.buildUrl(endpoint);

    expect(url).equal(newUrl);
  });

  describe('Test buildHeaders', () => {
    it('Token is not null', () => {
      const token = 'token';

      //@ts-ignore
      const headers = apiModelUtil.buildHeaders(token);

      expect(headers).toEqual({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    });

    it('Token is null', () => {
      const token = null;

      //@ts-ignore
      const headers = apiModelUtil.buildHeaders(token);

      expect(headers).toEqual({
        'Content-Type': 'application/json',
      });
    });
  });

  it('Test buildRequestOptions', () => {
    const url = '/url';
    const method = 'GET';
    const data = null;
    const apiRequestDto = new ApiRequestDto(url, method, data);
    const newUrl = '/newUrl';
    const buildUrlMock = vi.fn(() => newUrl);
    //@ts-ignore
    apiModelUtil.buildUrl = buildUrlMock;

    //@ts-ignore
    const requestOptions = apiModelUtil.buildRequestOptions(apiRequestDto);

    expect(requestOptions).toEqual({
      url: newUrl,
      method: method,
      data: data,
    });
  });

  it('Test getAuthorized', async () => {
    const apiRequestDto = new ApiRequestDto('/auth/authorized', 'GET');
    const prefix = 'API_MODEL';
    const message = 'Refresh succeed.';
    const authorizedUser = new ApiResponseDto(true, 'data', null);
    //@ts-ignore
    apiModelUtil.authorizedRequest = vi.fn(() => authorizedUser);
    authorizedUser.getData = vi.fn(() => 'data');

    //@ts-ignore
    const resultAuthorizedUserDto = await apiModelUtil.getAuthorized();

    expect(resultAuthorizedUserDto).toEqual({ ...authorizedUser });
    expect(apiModelUtil.authorizedRequest).toBeCalledWith(apiRequestDto);
    expect(TokenUtil.setAuthorized).toBeCalledTimes(1);
    expect(LoggerUtil.debugPrefixed).toBeCalledWith(prefix, message);
  });

  it('Test refresh', async () => {
    const refreshUrl = 'url';
    const headers = { header: 'val' };
    const data = 'tokens';
    const getData = vi.fn(() => data);
    //@ts-ignore
    apiModelUtil.buildUrl = vi.fn(() => refreshUrl);
    //@ts-ignore
    apiModelUtil.buildHeaders = vi.fn(() => headers);
    //@ts-ignore
    apiModelUtil.getAuthorized = vi.fn(
      () =>
        new Promise((resolve) => {
          resolve('123');
        }),
    );
    //@ts-ignore
    apiModelUtil.processSuccessResponse = vi.fn(() => ({
      success: true,
      getData,
    }));

    await apiModelUtil.refresh();

    expect(LoggerUtil.debug).toBeCalledWith('Refresh');
    expect(TokenUtil.getRefresh).toBeCalled();
    //@ts-ignore
    expect(apiModelUtil.buildUrl).toBeCalledWith(appConf.refreshEndpoint);
    //"refresh" is hard-coded in vi.mock for TokenUtil (look at the top of file)
    //@ts-ignore
    expect(apiModelUtil.buildHeaders).toBeCalledWith('refresh');
    expect(axios).toBeCalledWith({
      url: refreshUrl,
      method: 'POST',
      data: '{}',
      headers: {
        ...headers,
      },
    });
    expect(getData).toBeCalled();
    expect(TokenUtil.login).toBeCalledWith(data);
    //@ts-ignore
    expect(apiModelUtil.getAuthorized).toBeCalled();
  });

  describe('Test refreshAccessAndExecute', () => {
    const response = { success: true, data: '', error: null };
    beforeEach(() => {
      //@ts-ignore
      apiModelUtil.authorizedRequest = vi.fn(() => response);
    });
    it('Refresh failed', async () => {
      const getError = vi.fn(() => ({
        error: 'error',
      }));
      //@ts-ignore
      apiModelUtil.refresh = vi.fn(
        () => new Promise((resolve) => resolve({ getError })),
      );

      //@ts-ignore
      await apiModelUtil.refreshAccessAndExecute<any>();

      expect(TokenUtil.logout).toBeCalled();
      expect(getError).toBeCalled();
      expect(apiModelUtil.refresh).toBeCalled();
      expect(router.push).toBeCalledWith({ name: 'auth' });
    });
    it('Refresh success', async () => {
      //@ts-ignore
      apiModelUtil.refresh = vi.fn(
        () => new Promise((resolve) => resolve({ success: true })),
      );
      //@ts-ignore
      apiModelUtil.onRefresh = 'on-refresh';
      //@ts-ignore
      apiModelUtil.baseEndpointBuffer = '/buff';
      //@ts-ignore
      apiModelUtil.authorizedRequest = vi.fn(
        () => new Promise((resolve) => resolve(response)),
      );

      //@ts-ignore
      const res = await apiModelUtil.refreshAccessAndExecute();

      expect(apiModelUtil.refresh).toBeCalled();
      //@ts-ignore
      expect(apiModelUtil.baseEndpoint).toBe('/buff');
      //@ts-ignore
      expect(apiModelUtil.onRefresh).toBe(null);
      expect({ ...res }).toStrictEqual(response);
    });
  });

  describe('Test response processors', () => {
    const request = new ApiRequestDto('', '', '');
    beforeEach(() => {});

    describe('Test process failed response', () => {
      it('Test: failed on network', async () => {
        // vi.clearAllMocks()
        //@ts-ignore
        const res = await apiModelUtil.processFailedResponse(request, true, {
          code: 'ERR_NETWORK',
        });

        expect(res).toEqual(ApiResponseDto.networkError());
      });

      it('Test: failed on authorization (user unauthorized)', async () => {
        //@ts-ignore
        apiModelUtil.refreshAccessAndExecute = vi.fn();
        //@ts-ignore
        await apiModelUtil.processFailedResponse(request, false, {});

        //@ts-ignore
        expect(ApiResponseDto.buildFromError).toBeCalledWith({});
        // There is no way to correctly compare the result of call,
        // so we just check that refreshAccessAndExecute wasn`t called (so it would mean that if-stmnt was ignored)
        // @ts-ignore
        expect(apiModelUtil.refreshAccessAndExecute).toBeCalledTimes(0);
      });

      it('Test: failed on authorization (user authorized + correct error)', async () => {
        //@ts-ignore
        apiModelUtil.refreshAccessAndExecute = vi.fn(
          () => new Promise((resolve) => resolve('resp')),
        );

        //@ts-ignore
        const result = await apiModelUtil.processFailedResponse(request, true, {
          //@ts-ignore
          response: { code: 401 },
        });

        expect(LoggerUtil.debugPrefixed).toBeCalledWith(
          'API_MODEL',
          'Start refreshing',
        );
        //@ts-ignore
        expect(apiModelUtil.onRefresh).toStrictEqual(request);
        //@ts-ignore
        expect(apiModelUtil.refreshAccessAndExecute).toBeCalledTimes(1);
        expect(result).toBe('resp');
      });
    });

    it('Test process success response', () => {
      const response = 'response';

      //@ts-ignore
      const result = apiModelUtil.processSuccessResponse(response);

      expect(LoggerUtil.debugPrefixed).toBeCalledWith(
        'API_MODEL',
        'Request successfully proceed, with response: ',
        response,
      );
      expect(ApiResponseDto.successResponse).toBeCalledWith(response);
      expect(result).toBe(response);
    });
  });

  describe('Test request executes', () => {
    const request = new ApiRequestDto('', '', '');
    const requestOptions = {};
    const headers = { Authorization: `Bearer ${token}` };

    beforeEach(() => {
      //@ts-ignore
      apiModelUtil.buildRequestOptions = vi.fn(() => requestOptions);
      //@ts-ignore
      apiModelUtil.buildHeaders = vi.fn(() => headers);
    });

    it('Test authorized request', () => {
      apiModelUtil.authorizedRequest(request);

      expect(LoggerUtil.debugPrefixed).toBeCalledWith(
        'API_MODEL',
        'New request executed',
        requestOptions,
      );
      //@ts-ignore
      expect(apiModelUtil.buildRequestOptions).toBeCalledWith(request);
      //@ts-ignore
      expect(apiModelUtil.buildHeaders).toBeCalledWith(token);
      expect(axios).toBeCalledWith({
        ...requestOptions,
        headers: { ...headers },
      });
    });

    it('Test plain authorized request', () => {
      const additionalHeaders = { Header: 'value' };

      apiModelUtil.plainAuthorizedRequest(request, additionalHeaders);

      expect(LoggerUtil.debugPrefixed).toBeCalledWith(
        'API_MODEL',
        'New request executed',
        requestOptions,
      );
      //@ts-ignore
      expect(apiModelUtil.buildRequestOptions).toBeCalledWith(request);
      //@ts-ignore
      expect(apiModelUtil.buildHeaders).toBeCalledWith(token);
      expect(axios).toBeCalledWith({
        ...requestOptions,
        headers: { ...headers, ...additionalHeaders },
      });
    });

    it('Test unauthorized request', () => {
      apiModelUtil.unauthorizedRequest(request);

      expect(LoggerUtil.debugPrefixed).toBeCalledWith(
        'API_MODEL',
        'New request executed',
        requestOptions,
      );
      //@ts-ignore
      expect(apiModelUtil.buildRequestOptions).toBeCalledWith(request);
      //@ts-ignore
      expect(apiModelUtil.buildHeaders).toBeCalledWith();
      expect(axios).toBeCalledWith({
        ...requestOptions,
        headers: { ...headers },
      });
    });
  });
});
