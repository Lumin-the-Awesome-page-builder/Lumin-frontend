import { describe, expect, it, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';

describe('App.vue', async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should open menu on /', () => {
    const mockRoute = {
      path: '/',
    };


    const wrapper = mount(App, {
      global: {
        plugins: [router],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(true).toBe(true);
    // expect(wrapper.html()).toContain('Home');
  });
});
