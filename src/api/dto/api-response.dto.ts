import ApiErrorDto from '@/api/dto/api-error.dto';
import { AxiosError, AxiosResponse } from 'axios';
import ConvertResponseException from '@/api/exceptions/ConvertResponseException';

export default class ApiResponseDto<T> {
  constructor(
    public success: boolean,
    private data: T | null,
    private error: ApiErrorDto | null,
  ) {}

  getData(): T {
    if (this.success && this.data != null) return this.data;
    throw new ConvertResponseException();
  }

  getError(): ApiErrorDto {
    if (!this.success && this.error != null)
      return new ApiErrorDto(
        this.error.httpStatusCode,
        this.error.httpStatusText,
        this.error.data,
      );
    throw new ConvertResponseException();
  }

  static successResponse<T>(response: AxiosResponse): ApiResponseDto<T> {
    return new ApiResponseDto(true, response.data as T, null);
  }

  static networkError(): ApiResponseDto<any> {
    return new ApiResponseDto(
      false,
      null,
      new ApiErrorDto(500, 'Server unavailable', 'Server unavailable'),
    );
  }

  static buildFromError(error: AxiosError): ApiResponseDto<any> {
    if (error.response) {
      //@ts-ignore
      if (error.response.data.httpStatusCode) {
        return new ApiResponseDto(
          false,
          null,
          error.response.data as ApiErrorDto,
        );
      } else {
        return new ApiResponseDto(
          false,
          null,
          new ApiErrorDto(
            error.response.status,
            error.response.statusText,
            error.response.statusText,
          ),
        );
      }
    } else {
      return new ApiResponseDto(
        false,
        null,
        new ApiErrorDto(500, 'Server unavailable', 'Server unavailable'),
      );
    }
  }

  public toastIfError(notificationStore) {
    if (!this.success) {
      this.getError().showServerErrorToast(notificationStore);
    }
  }
}
