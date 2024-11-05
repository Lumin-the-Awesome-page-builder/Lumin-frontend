import { describe, it, vi, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useAuthStore from '@/store/auth.store.ts';
import AuthModel from '@/api/modules/auth/models/auth.model.ts';

vi.mock('@/api/modules/auth/models/auth.model.ts', () => {
  return {
    default: {
      auth: vi.fn(() => ({ success: true })),
      requestAuthorizedData: vi.fn(() => ({ success: true })),
      registration: vi.fn(() => ({ success: true })),
    },
  };
});

describe('Auth store tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test login', async () => {
    const authStore = useAuthStore();

    const res = await authStore.login('test');

    expect(AuthModel.auth).toBeCalledTimes(1);
    expect(AuthModel.auth).toBeCalledWith('test');
    expect(AuthModel.requestAuthorizedData).toBeCalled();
    expect(res).toBe(true);
  });

  it('Test register', async () => {
    const authStore = useAuthStore();

    const result = await authStore.register('test');

    expect(AuthModel.registration).toBeCalledTimes(1);
    expect(AuthModel.registration).toBeCalledWith('test');
    expect(AuthModel.requestAuthorizedData).toBeCalled();
    expect(result).toBe(true);
  });

  describe('Test getters', () => {
    const isLoggedIn = false;
    const loggedInUser = 'user';
    beforeEach(() => {
      setActivePinia(createPinia());
    });

    it('Test is logged in', () => {
      const store = useAuthStore();
      store.isLoggedIn = isLoggedIn;

      const res = store.getIsLoggedIn;

      expect(res).toBe(isLoggedIn);
    });

    it('Test logged in user', () => {
      const store = useAuthStore();
      store.loggedInUser = loggedInUser;

      const res = store.getLoggedInUser;

      expect(res).toBe(loggedInUser);
    });
  });
});
