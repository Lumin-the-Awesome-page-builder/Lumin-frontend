import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import ChooseDomenComponent from '@/components/modals/ChooseDomainComponent.vue';

vi.mock('@/store/choose-domen-component.store.ts', () => ({
  useChooseDomenStore: () => ({
    setDomen: vi.fn(),
    closeModal: vi.fn(),
    showModal: true,
  }),
}));

vi.mock('naive-ui', () => {
  return {
    useNotification: vi.fn(() => 'notificationStore'),
  };
});

describe('ChooseDomenComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly', () => {
    const wrapper = mount(ChooseDomenComponent);
    expect(wrapper.text()).toContain('Настройки публикации');
  });
});
