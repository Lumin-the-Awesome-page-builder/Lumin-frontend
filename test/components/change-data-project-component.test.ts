import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ChangeDataComponent from '@/components/modals/ChangeProjectDataComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/modals/change-data-project-component.store.ts', () => {
  const setProjectName = vi.fn();
  const setCategory = vi.fn();
  const setTags = vi.fn();
  const closeModal = vi.fn();
  const update = vi.fn();
  return {
    default: () => ({
      setProjectName,
      setCategory,
      setTags,
      closeModal,
      update,
    }),
  };
});

describe('ChangeDataComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly', () => {
    const wrapper = mount(ChangeDataComponent);
    expect(wrapper.text()).toContain('Изменение данных');
    expect(wrapper.text()).toContain('Название');
    expect(wrapper.text()).toContain('Категория');
    expect(wrapper.text()).toContain('Теги');
  });

  it('test on saveForm function', () => {
    const wrapper = mount(ChangeDataComponent);
    wrapper.vm.saveForm();

    expect(wrapper.vm.changeDataStore.setProjectName).toBeCalled();
    expect(wrapper.vm.changeDataStore.setCategory).toBeCalled();
    expect(wrapper.vm.changeDataStore.setTags).toBeCalled();
    expect(wrapper.vm.changeDataStore.update).toBeCalled();
  });
  it('test on saveForm function', () => {
    const wrapper = mount(ChangeDataComponent);
    wrapper.vm.cancelCallback();

    expect(wrapper.vm.changeDataStore.closeModal).toBeCalled();
  });
});
