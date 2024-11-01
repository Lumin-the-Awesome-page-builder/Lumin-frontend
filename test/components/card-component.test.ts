import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import CardComponent from '@/components/CardComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('CardComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders with custom props', () => {
    const customTitle = 'Мой проект';
    const customDate = new Date('2023-10-29');
    const customStars = 5;
    const customImageSrc = 'path/to/image.jpg';

    const wrapper = mount(CardComponent, {
      props: {
        title: customTitle,
        date: customDate,
        stars: customStars,
        imageSrc: customImageSrc,
      },
    });

    expect(wrapper.props().title).toBe(customTitle);
    expect(wrapper.props().date).toEqual(customDate);
    expect(wrapper.props().stars).toBe(customStars);
    expect(wrapper.props().imageSrc).toBe(customImageSrc);
  });

  it('formats date correctly', () => {
    const date = new Date('2023-10-29');
    const wrapper = mount(CardComponent, {
      props: { date },
    });

    expect(wrapper.vm.formattedDate).toBe('29.10.2023');
  });

  it('calls editTitle method', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const routerMock = {
      push: vi.fn(),
    };
    const wrapper = mount(CardComponent, {
      global: {
        mocks: {
          $router: routerMock,
        },
      },
    });
    wrapper.vm.editorStore = {
      useById: vi.fn(() => {}),
    };

    await wrapper.vm.editProject();

    expect(wrapper.vm.editorStore.useById).toHaveBeenCalled();
    expect(wrapper.vm.editorStore.useById).toHaveBeenCalledWith(
      expect.any(Number),
    );

    expect(routerMock.push).toHaveBeenCalledWith({ path: '/editor' });

    consoleLogSpy.mockRestore();
  });

  it('calls shareProject method', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const wrapper = mount(CardComponent);

    wrapper.vm.shareProject();

    expect(consoleLogSpy).toHaveBeenCalledWith(wrapper.props().title);

    consoleLogSpy.mockRestore();
  });
});
