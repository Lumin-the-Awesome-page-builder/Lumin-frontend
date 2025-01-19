import { it, expect, vi, describe, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FormView from '@/views/FormView.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('FormView Test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('goToBack navigates to the correct route', async () => {
    const wrapper = shallowMount(FormView, {
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
      path: '/project/1/edit',
    });
  });

  it('goToFormData navigates to the correct form data route', async () => {
    const wrapper = shallowMount(FormView, {
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

    await wrapper.vm.goToFormData(2);

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      path: '/project/1/forms/2',
    });
  });
});
