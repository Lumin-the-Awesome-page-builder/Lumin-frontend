import { mount } from '@vue/test-utils';
import { test, vi, expect, describe } from 'vitest';
import ProjectPreviewModal from '@/components/ProjectPreviewModal.vue';



vi.mock('@/store/project-preview-modal.store.ts', () => {
  return {
    default: () => ({
      getData: {
        name: 'Тестовый проект',
        date: '1698526800000',
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
    expect(wrapper.find('.backgroundContainer').exists()).toBe(false);
  });


  test('formats date correctly in prettierDate computed property', () => {
    const wrapper = mount(ProjectPreviewModal);
    expect(wrapper.vm.prettierDate).toBe('29/10/2023');
  });

  test('does not render modal if checkStatus is false', async () => {
    vi.mock('@/store/project-preview-modal.store.ts', () => {
      return {
        default: () => ({
          getData: {
            name: 'Тестовый проект',
            date: '2023-10-29T00:00:00Z',
            stars: 5,
          },
          getStatus: false,
          closeModal: vi.fn(),
        }),
      };
    });

    const wrapper = mount(ProjectPreviewModal);

    expect(wrapper.find('.backgroundContainer').exists()).toBe(false);
  });
})
