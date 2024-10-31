import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CardComponent from '@/components/CardComponent.vue';

describe('CardComponent', () => {
  it('отображает переданный заголовок', () => {
    const title = 'Тестовый проект';
    const wrapper = mount(CardComponent, {
      props: { title },
    });

    const cardTitle = wrapper.find('.card-title');
    expect(cardTitle.text()).toContain(title);
  });

  it('отображает переданную дату в формате дд.мм.гггг', () => {
    const date = new Date('2023-09-10');
    const wrapper = mount(CardComponent, {
      props: { date },
    });

    const cardDate = wrapper.find('.card-date');
    expect(cardDate.text()).toBe('10.09.2023');
  });

  it('отображает правильное количество звезд', () => {
    const stars = 4;
    const wrapper = mount(CardComponent, {
      props: { stars },
    });

    const starsCount = wrapper.find('.stars-count');
    expect(starsCount.text()).toContain(stars.toString());
  });

  it('отображает переданный путь к изображению', () => {
    const imageSrc = 'src/assets/test-image.jpeg';
    const wrapper = mount(CardComponent, {
      props: { imageSrc },
    });

    const image = wrapper.find('.image-card-project');
    expect(image.attributes('src')).toBe(imageSrc);
  });

  it('вызывает метод editTitle при нажатии на иконку редактирования', async () => {
    const wrapper = mount(CardComponent);
    const editTitleSpy = vi.spyOn(wrapper.vm, 'editTitle');

    const editIcon = wrapper.find('.edit-title');
    await editIcon.trigger('click');

    expect(editTitleSpy).toHaveBeenCalled();
  });

  it('вызывает метод shareProject при нажатии на иконку "Поделиться"', async () => {
    const wrapper = mount(CardComponent);
    const shareProjectSpy = vi.spyOn(wrapper.vm, 'shareProject');

    const shareIcon = wrapper.find('.card-actions .action-button[alt="share"]');
    await shareIcon.trigger('click');

    expect(shareProjectSpy).toHaveBeenCalled();
  });

  it('вызывает метод downloadProject при нажатии на иконку "Скачать"', async () => {
    const wrapper = mount(CardComponent);
    const downloadProjectSpy = vi.spyOn(wrapper.vm, 'downloadProject');

    const downloadIcon = wrapper.find(
      '.card-actions .action-button[alt="download"]',
    );
    await downloadIcon.trigger('click');

    expect(downloadProjectSpy).toHaveBeenCalled();
  });

  it('проверяет отображение чекбокса', () => {
    const wrapper = mount(CardComponent);
    const checkbox = wrapper.find('.checkbox');

    expect(checkbox.exists()).toBe(true);
  });
});
