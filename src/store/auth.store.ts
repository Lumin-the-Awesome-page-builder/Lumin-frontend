import { defineStore } from 'pinia';
import AuthModel from '@/api/modules/auth/models/auth.model.ts';
import AuthInputDto from '@/api/modules/auth/dto/login/auth-input.dto.ts';
import AuthYandexInputDto from '@/api/modules/auth/dto/login/auth-yandex-input.dto.ts';
import AuthVkInputDto from '@/api/modules/auth/dto/login/auth-vk-input.dto.ts';
import RegistrationInputDto from '@/api/modules/auth/dto/registration-input.dto.ts';

const useAuthStore = defineStore({
  id: 'auth-store',
  state: () => ({
    isLoggedIn: false,
    loggedInUser: null,
  }),
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getLoggedInUser: (state) => state.loggedInUser,
  },
  actions: {
    async login(authInputDto: AuthInputDto) {
      const res = await AuthModel.auth(authInputDto);

      const authorized = await AuthModel.requestAuthorizedData();

      if (authorized.success) {
        this.loggedInUser = authorized.getData();
      }

      this.isLoggedIn = res.success && authorized.success;

      return this.isLoggedIn;
    },

    async loginViaYandex(authYandexInputDto: AuthYandexInputDto) {
      const res = await AuthModel.authViaYandex(authYandexInputDto);

      const authorized = await AuthModel.requestAuthorizedData();

      if (authorized.success) {
        this.loggedInUser = authorized;
      }

      this.isLoggedIn = res.success && authorized.success;

      return this.isLoggedIn;
    },

    async loginViaVk(authVkInputDto: AuthVkInputDto) {
      const res = await AuthModel.authViaVk(authVkInputDto);

      const authorized = await AuthModel.requestAuthorizedData();

      if (authorized.success) {
        this.loggedInUser = authorized;
      }

      this.isLoggedIn = res.success && authorized.success;

      return this.isLoggedIn;
    },
    async register(registrationInputDto: RegistrationInputDto) {
      const result = await AuthModel.registration(registrationInputDto);

      const authorized = await AuthModel.requestAuthorizedData();

      if (authorized.success) {
        this.loggedInUser = authorized;
      }

      this.isLoggedIn = result.success && result.success;

      return this.isLoggedIn;
    },
  },
});

export default useAuthStore;
