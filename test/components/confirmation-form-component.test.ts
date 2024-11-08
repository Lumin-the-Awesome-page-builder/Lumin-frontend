import { mount } from '@vue/test-utils';
import { describe, beforeEach, test, expect, vi } from 'vitest';
import ConfirmationFormComponent from '@/components/ConfirmationFormComponent.vue';';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});


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
