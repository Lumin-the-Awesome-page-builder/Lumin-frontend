import { beforeEach, describe, expect, it, vi } from 'vitest';
import ApiErrorDto from '@/api/dto/api-error.dto.ts';

describe('Base apiErrorDto class tests', () => {
  let apiErrorDto: ApiErrorDto;
  const apiErrorData = 'ERROR';
  beforeEach(() => {
    apiErrorDto = new ApiErrorDto(401, 'Unauthorized', apiErrorData);
  });
  it('Test apiErrorDto creation', () => {
    expect(apiErrorDto.httpStatusCode).equal(401);
    expect(apiErrorDto.httpStatusText).equal('Unauthorized');
    expect(apiErrorDto.data).equal(apiErrorData);
  });

  it('Test apiErrorDto showServerErrorToast', () => {
    const nextTickMock = vi.fn();
    const toastMock = {
      add: vi.fn(),
    };
    const toastAddData = {
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: `Что-то пошло не так. Пожалуйста, свяжитесь с администратором.
    <p style="font-weight: 600; text-decoration: underline; cursor: pointer;">${String(apiErrorDto.data)}</p>`,
      life: 10000,
    };

    apiErrorDto.showServerErrorToast(toastMock, nextTickMock);

    expect(toastMock.add).toBeCalledTimes(1);
    expect(toastMock.add).toBeCalledWith(toastAddData);
    expect(nextTickMock).toBeCalledTimes(1);
  });
});
