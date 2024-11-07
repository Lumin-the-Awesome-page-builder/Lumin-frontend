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
    const notificationStore = { error: vi.fn() };

    apiErrorDto.showServerErrorToast(notificationStore);

    expect(notificationStore.error).toBeCalledTimes(1);
    expect(notificationStore.error).toBeCalledWith({
      content: 'Что-то пошло не так.',
      meta: 'Ошибка сервера. Попробуйте ещё раз.',
      duration: 2500,
      keepAliveOnHover: true,
    });
  });
});
