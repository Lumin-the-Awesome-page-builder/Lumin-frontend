import { mount } from '@vue/test-utils';
import { test, vi, expect, describe } from 'vitest';
import ProjectPreviewModal from '@/components/ProjectPreviewModal.vue';

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
  test('checks if modal is visible', () => {
    const wrapper = mount(ProjectPreviewModal);
    expect(wrapper.find('.backgroundContainer').exists()).toBe(true);
  });

  test('formats date correctly in prettierDate computed property', () => {
    const wrapper = mount(ProjectPreviewModal);
    expect(wrapper.vm.formattedDate).toBe('29.10.2024');
  });
});
