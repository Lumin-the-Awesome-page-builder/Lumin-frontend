import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import AuthModel from '@/api/modules/auth/models/auth.model.ts';
import AuthInputDto from '@/api/modules/auth/dto/login/auth-input.dto.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import ApiRequestDto from '@/api/dto/api-request.dto.ts';
import TokenUtil from '@/utils/token.util.ts';

vi.mock('@/utils/token.util', () => {
  return {
    default: {
      setAuthorized: vi.fn(),
      login: vi.fn(),
    },
  };
});

describe('Base AuthModel class tests', () => {
  const funcs = { requestAuthorizedData: AuthModel.requestAuthorizedData };
  let authModel;
  beforeEach(() => {
    authModel = AuthModel;
  });

  describe('Test auth', async () => {
    let authInputDto: AuthInputDto;
    let apiRequestDto: ApiRequestDto;
    beforeEach(() => {
      authInputDto = new AuthInputDto('login', 'password');
      apiRequestDto = new ApiRequestDto('', 'POST', authInputDto);
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('Token api response success', async () => {
      const data = 'data';
      const apiResponseDto = new ApiResponseDto(true, data, null);
      authModel.unauthorizedRequest = vi.fn(
        () =>
          new Promise<ApiResponseDto<any>>((resolve) => {
            resolve(apiResponseDto);
          }),
      );
      //@ts-ignore
      authModel.requestAuthorizedData = vi.fn(
        () =>
          new Promise<ApiResponseDto<any>>((resolve) => {
            resolve(apiResponseDto);
          }),
      );

      const result = await authModel.auth(authInputDto);

      expect(result).toEqual({ ...apiResponseDto });
      expect(authModel.unauthorizedRequest).toBeCalledWith(apiRequestDto);
      //@ts-ignore
      expect(TokenUtil.login).toBeCalledWith(data);
      //@ts-ignore
      expect(authModel.requestAuthorizedData).toBeCalledTimes(1);
      //@ts-ignore
      expect(TokenUtil.setAuthorized).toBeCalledWith(data);
    });

    it('Token api response failed', async () => {
      const data = 'data';
      const apiResponseDto = new ApiResponseDto(false, data, null);
      authModel.unauthorizedRequest = vi.fn(
        () =>
          new Promise<ApiResponseDto<any>>((resolve) => {
            resolve(apiResponseDto);
          }),
      );
      //@ts-ignore
      authModel.requestAuthorizedData = vi.fn(
        () =>
          new Promise<ApiResponseDto<any>>((resolve) => {
            resolve(apiResponseDto);
          }),
      );

      const result = await authModel.auth(authInputDto);

      expect(result).toEqual({ ...apiResponseDto });
      expect(authModel.unauthorizedRequest).toBeCalledWith(apiRequestDto);
      //@ts-ignore
      expect(TokenUtil.login).toBeCalledTimes(0);
      //@ts-ignore
      expect(authModel.requestAuthorizedData).toBeCalledTimes(0);
      //@ts-ignore
      expect(TokenUtil.setAuthorized).toBeCalledTimes(0);
    });
  });

  it('Test requestAuthorizedData', async () => {
    authModel = AuthModel;
    const apiRequestDto = new ApiRequestDto('/authorized', 'GET');
    const apiResponseDto = new ApiResponseDto(true, 'data', null);

    authModel.requestAuthorizedData = funcs.requestAuthorizedData;

    authModel.authorizedRequest = vi.fn(
      () =>
        new Promise<ApiResponseDto<any>>((resolve) => {
          resolve(apiResponseDto);
        }),
    );

    //@ts-ignore
    await authModel.requestAuthorizedData();

    expect(authModel.authorizedRequest).toBeCalledWith({ ...apiRequestDto });
  });
});
