import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import ChooseDomenComponent from '@/components/ChooseDomenComponent.vue';

vi.mock('@/store/choose-domen-component.store.ts', () => ({
  useChooseDomenStore: () => ({
    setDomen: vi.fn(),
    closeModal: vi.fn(),
    showModal: true,
  }),
}));

describe('ChooseDomenComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly', () => {
    const wrapper = mount(ChooseDomenComponent);
    expect(wrapper.text()).toContain('Добро пожаловать');
    expect(wrapper.text()).toContain(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    );
  });
});
