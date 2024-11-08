import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import HelloFormComponent from '@/components/modals/HelloFormComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/modals/hello-form-component.store.ts', () => {
  const closeModal = vi.fn();
  const openModal = vi.fn();
  return {
    default: () => ({
      closeModal,
      openModal,
    }),
  };
});

describe('HelloFormComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly with welcome message', () => {
    const wrapper = mount(HelloFormComponent);
    expect(wrapper.text()).toContain('Добро пожаловать!');
  });
  it('test close functions', () => {
    const wrapper = mount(HelloFormComponent);
    wrapper.vm.cancel();
    expect(wrapper.vm.helloFormStore.closeModal).toBeCalled();
  });
});
