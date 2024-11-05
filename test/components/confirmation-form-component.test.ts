import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ConfirmationFormComponent from '@/components/ConfirmationFormComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/confirmation-form-component.store.ts', () => ({
  useConfirmationStore: () => ({
    showModal: true,
    closeModal: vi.fn(),
  }),
}));

describe('ConfirmationFormComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly with confirmation message', () => {
    const wrapper = mount(ConfirmationFormComponent);
    expect(wrapper.text()).toContain('Подтверждение');
    expect(wrapper.text()).toContain(
      'На вашу почту было отправлено письмо с кодом подтверждения.',
    );
    expect(wrapper.text()).toContain('Введите его ниже:');
  });
});
