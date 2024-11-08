import { assert, beforeEach, describe, expect, it, vi } from 'vitest';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import ApiErrorDto from '@/api/dto/api-error.dto.ts';
import ConvertResponseException from '@/api/exceptions/ConvertResponseException.ts';
import {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

describe('Base apiResponseDto class tests', () => {
  let apiResponseDtoSuccess: ApiResponseDto<string>;
  let apiResponseDtoFailure: ApiResponseDto<string>;
  let apiErrorDto: ApiErrorDto;
  let data: string;
  let httpStatusCode: number;
  let httpStatusText: string;
  const apiErrorData = 'ERROR';
  beforeEach(() => {
    data = 'data';
    httpStatusCode = 401;
    httpStatusText = 'Unauthorized';
    apiResponseDtoSuccess = new ApiResponseDto(true, data, null);
    apiErrorDto = new ApiErrorDto(httpStatusCode, httpStatusText, apiErrorData);
    apiResponseDtoFailure = new ApiResponseDto(false, null, apiErrorDto);
  });
  describe('Test creation', () => {
    it('Test apiResponseDtoSuccess creation', () => {
      expect(apiResponseDtoSuccess.success).equal(true);
      //@ts-ignore
      expect(apiResponseDtoSuccess.data).equal('data');
      //@ts-ignore
      expect(apiResponseDtoSuccess.error).equal(null);
    });

    it('Test apiResponseDtoFailure creation', () => {
      expect(apiResponseDtoFailure.success).equal(false);
      //@ts-ignore
      expect(apiResponseDtoFailure.data).equal(null);
      //@ts-ignore
      expect(apiResponseDtoFailure.error).equal(apiErrorDto);
    });
  });

  describe('Test getData', () => {
    it('Test getData for apiResponseDtoSuccess', () => {
      const resultData = apiResponseDtoSuccess.getData();

      expect(resultData).equal(data);
      assert.doesNotThrow(() => apiResponseDtoSuccess.getData());
    });

    it('Test getData for apiResponseDtoFailure', () => {
      assert.throws(
        () => apiResponseDtoFailure.getData(),
        ConvertResponseException,
      );
    });
  });

  describe('Test getError', () => {
    it('Test getError for apiResponseDtoSuccess', () => {
      assert.throws(
        () => apiResponseDtoSuccess.getError(),
        ConvertResponseException,
      );
    });

    it('Test getError for apiResponseDtoFailure', () => {
      const resultError = apiResponseDtoFailure.getError();

      expect(resultError).toEqual(apiErrorDto);
      assert.doesNotThrow(() => apiResponseDtoFailure.getError());
    });
  });

  it('Test successResponse', () => {
    const axiosResponse = {
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {},
    } as AxiosResponse;

    const resultSuccessResponse = ApiResponseDto.successResponse(axiosResponse);

    expect(resultSuccessResponse).toEqual({
      success: true,
      data: 'data',
      error: null,
    });
  });

  it('Test networkError', () => {
    const resultNetworkError = ApiResponseDto.networkError();

    expect(resultNetworkError).toEqual({
      success: false,
      data: null,
      error: {
        httpStatusCode: 500,
        httpStatusText: 'Server unavailable',
        data: 'Server unavailable',
      },
    });
  });

  describe('Test buildFromError', () => {
    let request: object;
    let headers: AxiosHeaders;
    let config: InternalAxiosRequestConfig;
    beforeEach(() => {
      request = { path: '/foo' };
      headers = new AxiosHeaders();
      config = {
        url: 'http://localhost:6666',
        headers,
      };
    });

    describe('Test buildFromError error with response', () => {
      it('The error response data contains httpStatusCode', () => {
        const error = new AxiosError('message', 'code', config, request, {
          status: 401,
          data: apiErrorDto,
          statusText: 'Unauthorized',
          config,
          headers,
        });

        const resultBuildFromError = ApiResponseDto.buildFromError(error);

        expect(resultBuildFromError).toEqual({
          success: false,
          data: null,
          error: apiErrorDto,
        });
      });

      it('The error response data is missing httpStatusCode', () => {
        const error = new AxiosError('message', 'code', config, request, {
          status: 401,
          data: {},
          statusText: 'Unauthorized',
          config,
          headers,
        });

        const resultBuildFromError = ApiResponseDto.buildFromError(error);

        expect(resultBuildFromError).toEqual({
          success: false,
          data: null,
          error: {
            httpStatusCode: error.response.status,
            httpStatusText: error.response.statusText,
            data: error.response.statusText,
          },
        });
      });
    });

    it('Test buildFromError error without response', () => {
      const error = new AxiosError('message', 'code', config, request, null);

      const resultBuildFromError = ApiResponseDto.buildFromError(error);

      expect(resultBuildFromError).toEqual({
        success: false,
        data: null,
        error: {
          httpStatusCode: 500,
          httpStatusText: 'Server unavailable',
          data: 'Server unavailable',
        },
      });
    });
  });

  describe('Test toastIfError', () => {
    let getErrorMock: any;
    let showServerErrorToastMock: any;
    let notificationStore: any;
    beforeEach(() => {
      notificationStore = 'notificationStore';
      showServerErrorToastMock = vi.fn();
      getErrorMock = vi.fn(() => ({
        showServerErrorToast: showServerErrorToastMock,
      }));
    });

    it('Success api response', () => {
      apiResponseDtoSuccess.getError = getErrorMock;

      apiResponseDtoSuccess.toastIfError(notificationStore);

      expect(apiResponseDtoSuccess.getError).toBeCalledTimes(0);
    });
    it('Failure api response', () => {
      apiResponseDtoFailure.getError = getErrorMock;

      apiResponseDtoFailure.toastIfError(notificationStore);

      expect(apiResponseDtoFailure.getError).toBeCalledTimes(1);
      expect(showServerErrorToastMock).toBeCalledTimes(1);
      expect(showServerErrorToastMock).toBeCalledWith(notificationStore);
    });
  });
});
