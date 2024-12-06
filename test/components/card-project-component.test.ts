import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ProjectCard from '@/components/CardProjectComponent.vue';

describe('CardProject', () => {
  it('отрисовывается с пользовательскими пропсами', () => {
    const customBannerSrc = 'path/to/banner.jpg';
    const customDate = new Date('2023-10-29');
    const customStars = 5;

    const wrapper = mount(ProjectCard, {
      props: {
        bannerSrc: customBannerSrc,
        date: customDate,
        stars: customStars,
      },
    });

    expect(wrapper.props().bannerSrc).toBe(customBannerSrc);
    expect(wrapper.props().date).toEqual(customDate);
    expect(wrapper.props().stars).toBe(customStars);

    const bannerImage = wrapper.find('.banner-image');
    expect(bannerImage.attributes('src')).toBe(customBannerSrc);

    expect(wrapper.find('.stars-count').text()).toContain(String(customStars));
  });

  it('форматирует дату правильно', () => {
    const date = new Date('2023-10-29');
    const wrapper = mount(ProjectCard, {
      props: { date },
    });

    expect(wrapper.vm.formattedDate).toBe('29.10.2023');
    expect(wrapper.find('.card-date').text()).toBe('29.10.2023');
  });

  it('вызывает метод shareProject при нажатии на иконку', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const wrapper = mount(ProjectCard);

    wrapper.find('.share-icon img').trigger('click');
    expect(consoleLogSpy).toHaveBeenCalledWith('Share project');
    consoleLogSpy.mockRestore();
  });

  it('вызывает метод downloadProject при нажатии на иконку', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const wrapper = mount(ProjectCard);

    wrapper.find('.download-icon img').trigger('click');
    expect(consoleLogSpy).toHaveBeenCalledWith('Download project');
    consoleLogSpy.mockRestore();
  });

  it('вызывает метод deleteProject при нажатии на иконку', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const wrapper = mount(ProjectCard);

    wrapper.find('.delete-section').trigger('click');
    expect(consoleLogSpy).toHaveBeenCalledWith('Delete project');
    consoleLogSpy.mockRestore();
  });

  it('вызывает метод editProject при нажатии на иконку', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const wrapper = mount(ProjectCard);

    wrapper.find('.edit-section img').trigger('click');
    expect(consoleLogSpy).toHaveBeenCalledWith('Edit project');
    consoleLogSpy.mockRestore();
  });

  it('отображает баннер с правильным src', () => {
    const bannerSrc = 'path/to/banner.jpg';
    const wrapper = mount(ProjectCard, {
      props: { bannerSrc },
    });

    const image = wrapper.find('.banner-image');
    expect(image.attributes('src')).toBe(bannerSrc);
  });
});
