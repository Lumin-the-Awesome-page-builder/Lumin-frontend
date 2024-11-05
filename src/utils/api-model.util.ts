import ApiResponseDto from '@/api/dto/api-response.dto';
import axios, { AxiosError, AxiosResponse } from 'axios';
import appConf from '@/api/conf/app.conf';
import ApiRequestDto from '@/api/dto/api-request.dto';
import TokenPairDto from '@/api/modules/auth/dto/token-pair.dto';
import TokenUtil from '@/utils/token.util';
import LoggerUtil from '@/utils/logger/logger.util';
import AuthorizedUserDto from '@/api/modules/auth/dto/authorized-user.dto';
import router from '@/router/index';

export default class ApiModelUtil {
  constructor(private baseEndpoint: string) {}

  private baseEndpointBuffer = '';

  private onRefresh: ApiRequestDto | null = null;

  private buildUrl(endpoint: string): string {
    const baseUrl = `${appConf.endpoint}${this.baseEndpoint}${endpoint}`
      .replace('//', '/')
      .replace('//', '/');

    return `${appConf.proto}://${baseUrl}`;
  }

  private buildHeaders(token: string | null = null) {
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private buildRequestOptions(request: ApiRequestDto): ApiRequestDto {
    return new ApiRequestDto(
      this.buildUrl(request.url),
      request.method,
      request.data,
    );
  }

  private async getAuthorized() {
    const authorizedUserDto = await this.authorizedRequest<AuthorizedUserDto>(
      new ApiRequestDto('/auth/authorized', 'GET'),
    );
    TokenUtil.setAuthorized(authorizedUserDto.getData());
    LoggerUtil.debugPrefixed('API_MODEL', 'Refresh succeed.');
    return authorizedUserDto;
  }

  async refresh(): Promise<ApiResponseDto<TokenPairDto>> {
    LoggerUtil.debug('Refresh');
    const refreshToken = TokenUtil.getRefresh();
    this.baseEndpointBuffer = this.baseEndpoint;
    this.baseEndpoint = '';
    const res = await axios<TokenPairDto>({
      url: this.buildUrl(appConf.refreshEndpoint),
      method: 'POST',
      data: '{}',
      headers: {
        ...this.buildHeaders(refreshToken),
      },
    })
      .then((res: AxiosResponse) =>
        this.processSuccessResponse<TokenPairDto>(res),
      )
      .catch((err: AxiosError) =>
        this.processFailedResponse<TokenPairDto>(null, false, err),
      );
    if (res.success) {
      TokenUtil.login(res.getData());
      await this.getAuthorized();
    }
    return res;
  }

  private async refreshAccessAndExecute<T>(): Promise<ApiResponseDto<T>> {
    const refreshResult = await this.refresh();
    if (refreshResult && refreshResult.success && this.onRefresh) {
      this.baseEndpoint = this.baseEndpointBuffer;
      const afterRefresh = await this.authorizedRequest(this.onRefresh);
      this.onRefresh = null;
      return afterRefresh as ApiResponseDto<T>;
    } else {
      TokenUtil.logout();
      router.push({ name: 'auth' });
      return new ApiResponseDto<T>(false, null, refreshResult.getError());
    }
  }

  private processSuccessResponse<T>(
    response: AxiosResponse,
  ): ApiResponseDto<T> {
    LoggerUtil.debugPrefixed(
      'API_MODEL',
      'Request successfully proceed, with response: ',
      response,
    );
    return ApiResponseDto.successResponse<T>(response);
  }

  private async processFailedResponse<T>(
    request: ApiRequestDto | null,
    authorized: boolean,
    error: AxiosError,
  ): Promise<ApiResponseDto<T>> {
    LoggerUtil.debugPrefixed(
      'API_MODEL',
      'Request',
      request,
      'failed with error: ',
      error,
    );
    if (error.code === 'ERR_NETWORK') return ApiResponseDto.networkError();

    const result = ApiResponseDto.buildFromError(error);
    const statusCode = result.getError().httpStatusCode;
    if (
      authorized &&
      request &&
      (statusCode == 401 || statusCode == 403) &&
      this.onRefresh == null
    ) {
      LoggerUtil.debugPrefixed('API_MODEL', 'Start refreshing');
      this.onRefresh = request;
      return await this.refreshAccessAndExecute();
    }
    return result;
  }

  async unauthorizedRequest<T>(
    request: ApiRequestDto,
  ): Promise<ApiResponseDto<T>> {
    const requestOptions = this.buildRequestOptions(request);
    LoggerUtil.debugPrefixed(
      'API_MODEL',
      'New request executed',
      requestOptions,
    );
    const result: Promise<ApiResponseDto<T>> = axios<T>({
      ...requestOptions,
      headers: {
        ...this.buildHeaders(),
      },
    })
      .then((res: AxiosResponse<T>) => this.processSuccessResponse<T>(res))
      .catch((err: AxiosError) =>
        this.processFailedResponse<T>(request, false, err),
      );

    return await result;
  }

  async plainAuthorizedRequest(
    request: ApiRequestDto,
    headers: object = {},
  ): Promise<AxiosResponse<any>> {
    const requestOptions = this.buildRequestOptions(request);
    LoggerUtil.debugPrefixed(
      'API_MODEL',
      'New request executed',
      requestOptions,
    );
    const accessToken = TokenUtil.getAccess();

    return axios({
      ...requestOptions,
      headers: {
        ...this.buildHeaders(accessToken),
        ...headers,
      },
    }).catch(async (err: AxiosError) => {
      if (err.code == '401') {
        await this.authorizedRequest(
          new ApiRequestDto('/auth/authorized', 'GET'),
        );
        return this.plainAuthorizedRequest(request, headers);
      } else throw err;
    }) as Promise<AxiosResponse<any>> | Promise<AxiosError> | any;
  }

  async authorizedRequest<T>(
    request: ApiRequestDto,
  ): Promise<ApiResponseDto<T>> {
    const requestOptions = this.buildRequestOptions(request);
    LoggerUtil.debugPrefixed(
      'API_MODEL',
      'New request executed',
      requestOptions,
    );
    const accessToken = TokenUtil.getAccess();

    const result: Promise<ApiResponseDto<T>> = axios<T>({
      ...requestOptions,
      headers: {
        ...this.buildHeaders(accessToken),
      },
    })
      .then((res: AxiosResponse<T>) => this.processSuccessResponse<T>(res))
      .catch((err: AxiosError) =>
        this.processFailedResponse<T>(request, true, err),
      );

    return await result;
  }
}
