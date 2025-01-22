import { it, expect, vi, describe, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import EnvView from '@/views/EnvView.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('EnvView Test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('goToEnvList navigates to the correct route', async () => {
    const wrapper = shallowMount(EnvView, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
          $route: {
            params: {
              envId: 1,
            },
          },
        },
      },
    });

    await wrapper.vm.goToEnvList();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ path: '/envs' });
  });

  it('goToContainer navigates to the correct container route', async () => {
    const wrapper = shallowMount(EnvView, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
          $route: {
            params: {
              envId: 1,
            },
          },
        },
      },
    });

    await wrapper.vm.goToContainer(2, {
      id: 2,
      name: 'Container 2',
      status: 'stopped',
    });

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      path: '/envs/1/container/2',
    });
  });
});
