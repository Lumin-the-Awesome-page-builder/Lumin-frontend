import { defineStore } from 'pinia';
import AuthModel from '@/api/modules/auth/models/auth.model.ts';
import AuthInputDto from '@/api/modules/auth/dto/login/auth-input.dto.ts';

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
        this.loggedInUser = authorized;
      }

      this.isLoggedIn = res.success && authorized.success;

      return this.isLoggedIn;
    },
  },
});

export default useAuthStore;
