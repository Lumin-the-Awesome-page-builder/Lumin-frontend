import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import HelloFormComponent from '@/components/modals/HelloFormComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/hello-form-component.store.ts', () => ({
  useHelloFormStore: () => ({
    showModal: true,
    closeModal: vi.fn(),
  }),
}));

describe('HelloFormComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly with welcome message', () => {
    const wrapper = mount(HelloFormComponent);
    expect(wrapper.text()).toContain('Добро пожаловать!');
  });
});
