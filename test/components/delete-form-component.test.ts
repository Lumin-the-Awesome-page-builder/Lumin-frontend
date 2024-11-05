import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import DeleteFormComponent from '@/components/modals/DeleteFormComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/delete-form-component.store.ts', () => ({
  useProjectStore: () => ({
    projectName: 'Мой проект',
    showModal: true,
    closeModal: vi.fn(),
  }),
}));

describe('DeleteFormComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly with project name', () => {
    const wrapper = mount(DeleteFormComponent);
    expect(wrapper.text()).toContain(
      'Вы уверены, что хотите удалить Мой проект?',
    );
  });
});
