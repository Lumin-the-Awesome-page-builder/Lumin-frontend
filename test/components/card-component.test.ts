import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import CardComponent from '@/components/CardComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

vi.mock('naive-ui', () => {
  return {
    useNotification: vi.fn(() => 'notificationStore'),
  };
});

describe('CardComponent tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders with custom props', () => {
    const customTitle = 'Мой проект';
    const customDate = new Date('2023-10-29');
    const customStars = 5;
    const customImageSrc = 'path/to/image.jpg';
    const customId = 1;

    const wrapper = mount(CardComponent, {
      props: {
        id: customId,
        title: customTitle,
        date: customDate,
        stars: customStars,
        preview: customImageSrc,
      },
    });

    expect(wrapper.props().title).toBe(customTitle);
    expect(wrapper.props().date).toEqual(customDate);
    expect(wrapper.props().stars).toBe(customStars);
    expect(wrapper.props().preview).toBe(customImageSrc);
  });

  it('formats date correctly', () => {
    const date = new Date('2023-10-29');
    const wrapper = mount(CardComponent, {
      props: { date },
    });

    expect(wrapper.vm.formattedDate).toBe('29.10.2023');
  });

  it('calls editProject method', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const routerMock = {
      push: vi.fn(),
    };
    const customId = 1;
    const wrapper = mount(CardComponent, {
      props: {
        id: customId,
      },
      global: {
        mocks: {
          $router: routerMock,
        },
      },
    });

    await wrapper.vm.editProject();

    expect(routerMock.push).toHaveBeenCalledWith({
      path: `/project/${customId}/edit`,
    });
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
