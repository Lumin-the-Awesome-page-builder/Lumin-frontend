import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import WidgetComponent from '@/components/WidgetComponent.vue';

describe('WidgetComponent', () => {
  it('отображает переданный заголовок', () => {
    const title = 'Тестовый виджет';
    const wrapper = mount(WidgetComponent, {
      props: { title },
    });

    const widgetTitle = wrapper.find('.widget-title');
    expect(widgetTitle.text()).toContain(title);
  });

  it('отображает переданную дату в формате дд.мм.гггг', () => {
    const date = new Date('2023-08-15');
    const wrapper = mount(WidgetComponent, {
      props: { date },
    });

    const widgetDate = wrapper.find('.widget-date');
    expect(widgetDate.text()).toBe('15.08.2023');
  });

  it('отображает правильное количество звезд', () => {
    const stars = 5;
    const wrapper = mount(WidgetComponent, {
      props: { stars },
    });

    const starsCount = wrapper.find('.stars-count');
    expect(starsCount.text()).toContain(stars.toString());
  });

  it('отображает переданный путь к изображению', () => {
    const imageSrc = 'src/assets/test-image.jpeg';
    const wrapper = mount(WidgetComponent, {
      props: { imageSrc },
    });

    const image = wrapper.find('.image-widget-project');
    expect(image.attributes('src')).toBe(imageSrc);
  });

  it('вызывает метод editTitle при нажатии на иконку редактирования', async () => {
    const wrapper = mount(WidgetComponent);
    const editTitleSpy = vi.spyOn(wrapper.vm, 'editTitle');

    const editIcon = wrapper.find('.edit-title');
    await editIcon.trigger('click');

    expect(editTitleSpy).toHaveBeenCalled();
  });

  it('вызывает метод shareProject при нажатии на иконку "Поделиться"', async () => {
    const wrapper = mount(WidgetComponent);
    const shareProjectSpy = vi.spyOn(wrapper.vm, 'shareProject');

    const shareIcon = wrapper.find(
      '.widget-actions .action-button[alt="share"]',
    );
    await shareIcon.trigger('click');

    expect(shareProjectSpy).toHaveBeenCalled();
  });

  it('вызывает метод downloadProject при нажатии на иконку "Скачать"', async () => {
    const wrapper = mount(WidgetComponent);
    const downloadProjectSpy = vi.spyOn(wrapper.vm, 'downloadProject');

    const downloadIcon = wrapper.find(
      '.widget-actions .action-button[alt="download"]',
    );
    await downloadIcon.trigger('click');

    expect(downloadProjectSpy).toHaveBeenCalled();
  });

  it('рендерит иконку просмотра в оверлее', () => {
    const wrapper = mount(WidgetComponent);
    const overlayEye = wrapper.find('.overlay-eye');

    expect(overlayEye.exists()).toBe(true);
    expect(overlayEye.attributes('src')).toBe(
      '/src/assets/imageWidget/eye.svg',
    );
  });
});
