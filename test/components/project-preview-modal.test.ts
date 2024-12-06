import { mount } from '@vue/test-utils';
import { test, vi, expect, describe, beforeEach } from 'vitest';
import ProjectPreviewModal from '@/components/modals/ProjectPreviewModal.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/project-preview-modal.store.ts', () => {
  return {
    default: () => ({
      getData: {
        name: 'Тестовый проект',
        created_at: 1730207344084,
        stars: 5,
      },
      getStatus: true,
      closeModal: vi.fn(),
    }),
  };
});

describe('Test link component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test('checks if modal is visible', () => {
    const wrapper = mount(ProjectPreviewModal);
    expect(wrapper.find('.backgroundContainer').exists()).toBe(true);
  });

  test('formats date correctly in prettierDate computed property', () => {
    const wrapper = mount(ProjectPreviewModal);
    expect(wrapper.vm.formattedDate).toBe('29.10.2024');
  });
});
