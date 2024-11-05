import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ChangeDataComponent from '@/components/modals/ChangeProjectDataComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/change-data-project-component.store.ts', () => ({
  useChangeDataStore: () => ({
    setProjectName: vi.fn(),
    setCategory: vi.fn(),
    setTags: vi.fn(),
    closeModal: vi.fn(),
  }),
}));

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
});
