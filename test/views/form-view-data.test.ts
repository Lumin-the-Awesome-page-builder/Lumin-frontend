import { it, expect, vi, describe, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FormViewData from '@/views/FormViewData.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('FormViewData Test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('goToBack navigates to the correct route', async () => {
    const wrapper = shallowMount(FormViewData, {
      global: {
        mocks: {
          $route: {
            params: {
              id: 1,
            },
          },
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await wrapper.vm.goToBack();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      path: '/project/1/forms',
    });
  });
});
