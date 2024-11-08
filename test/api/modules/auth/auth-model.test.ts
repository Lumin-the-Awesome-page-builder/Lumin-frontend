import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import AuthModel from '@/api/modules/auth/models/auth.model.ts';
import AuthInputDto from '@/api/modules/auth/dto/login/auth-input.dto.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import ApiRequestDto from '@/api/dto/api-request.dto.ts';
import TokenUtil from '@/utils/token.util.ts';
import RegistrationInputDto from '@/api/modules/auth/dto/registration-input.dto.ts';
import AuthVkInputDto from '@/api/modules/auth/dto/login/auth-vk-input.dto.ts';
import AuthYandexInputDto from '@/api/modules/auth/dto/login/auth-yandex-input.dto.ts';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

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

  const data = 'data';
  const apiResponseDto = new ApiResponseDto(true, data, null);
  beforeEach(() => {
    authModel = AuthModel;
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
  });

  describe('Test auth', async () => {
    let authInputDto: AuthInputDto;
    let apiRequestDto: ApiRequestDto;
    beforeEach(() => {
      authInputDto = new AuthInputDto('login', 'password');
      apiRequestDto = new ApiRequestDto('/auth', 'POST', authInputDto);
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('Token api response success', async () => {
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
      const apiResponseDto = new ApiResponseDto(false, data, '403');

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

  describe('Test registration', async () => {
    let registrationInputDto: RegistrationInputDto;
    let apiRequestDto: ApiRequestDto;
    beforeEach(() => {
      registrationInputDto = new RegistrationInputDto('login', 'password');
      apiRequestDto = new ApiRequestDto(
        '/auth/signup',
        'POST',
        registrationInputDto,
      );
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('Token api response success', async () => {
      const result = await authModel.registration(registrationInputDto);

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
      const apiResponseDto = new ApiResponseDto(false, data, '403');

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

      const result = await authModel.registration(registrationInputDto);

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
    const apiRequestDto = new ApiRequestDto('/auth/authorized', 'GET');
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

  describe('Test auth via Vk and yandex', () => {
    describe('Test auth via Vk', () => {
      it('success auth via Vk', async () => {
        const authVkDto = new AuthVkInputDto(52, 'login');
        const apiRequestDto = new ApiRequestDto('/auth/vk', 'POST', authVkDto);

        const result = await authModel.authViaVk(authVkDto);

        expect(result).toEqual(apiResponseDto);
        expect(authModel.unauthorizedRequest).toBeCalledWith(apiRequestDto);
        //@ts-ignore
        expect(TokenUtil.login).toBeCalledWith(data);
        //@ts-ignore
        expect(authModel.requestAuthorizedData).toBeCalledTimes(1);
        //@ts-ignore
        expect(TokenUtil.setAuthorized).toBeCalledWith(data);
      });
    });

    describe('Test auth via Yandex', () => {
      it('success auth via Yandex', async () => {
        const authYandexInputDto = new AuthYandexInputDto('token');
        const apiRequestDto = new ApiRequestDto(
          '/auth/yandex',
          'POST',
          authYandexInputDto,
        );

        const result = await authModel.authViaYandex(authYandexInputDto);

        expect(result).toEqual(apiResponseDto);
        expect(authModel.unauthorizedRequest).toBeCalledWith(apiRequestDto);
        //@ts-ignore
        expect(TokenUtil.login).toBeCalledWith(data);
        //@ts-ignore
        expect(authModel.requestAuthorizedData).toBeCalledTimes(1);
        //@ts-ignore
        expect(TokenUtil.setAuthorized).toBeCalledWith(data);
      });
    });
  });
});
