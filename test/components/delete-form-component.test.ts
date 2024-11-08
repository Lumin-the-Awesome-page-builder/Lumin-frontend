import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import DeleteFormComponent from '@/components/modals/DeleteFormComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/modals/delete-form-component.store.ts', () => {
  const closeModal = vi.fn();
  return {
    default: () => ({
      projectName: 'Мой проект',
      showModal: true,
      closeModal,
      project: { name: 'name' },
    }),
  };
});

describe('DeleteFormComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly with project name', () => {
    const wrapper = mount(DeleteFormComponent);
    expect(wrapper.text()).toContain(
      'Подтвержение удаленияВы уверены, что хотите удалить name?Отменить это действие будет невозможно.Удалить',
    );
  });
  it('test close functions', () => {
    const wrapper = mount(DeleteFormComponent);
    wrapper.vm.cancelCallback();
    expect(wrapper.vm.projectStore.closeModal).toBeCalled();
  });
});
