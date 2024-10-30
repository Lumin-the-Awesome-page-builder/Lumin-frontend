import { mount } from '@vue/test-utils';
import { test, vi, expect } from 'vitest';
import CardComponent from '@/components/CardComponent.vue';

test('renders with custom props', () => {
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

test('formats date correctly', () => {
  const date = new Date('2023-10-29');
  const wrapper = mount(CardComponent, {
    props: { date },
  });

  expect(wrapper.vm.formattedDate).toBe('29.10.2023');
});

test('calls editTitle method', () => {
  const consoleLogSpy = vi.spyOn(console, 'log');
  const wrapper = mount(CardComponent);

  wrapper.vm.editTitle();

  expect(consoleLogSpy).toHaveBeenCalledWith(wrapper.props().title);

  consoleLogSpy.mockRestore();
});

test('calls shareProject method', () => {
  const consoleLogSpy = vi.spyOn(console, 'log');
  const wrapper = mount(CardComponent);

  wrapper.vm.shareProject();

  expect(consoleLogSpy).toHaveBeenCalledWith(wrapper.props().title);

  consoleLogSpy.mockRestore();
});

test('calls downloadProject method', () => {
  const consoleLogSpy = vi.spyOn(console, 'log');
  const wrapper = mount(CardComponent);

  wrapper.vm.downloadProject();

  expect(consoleLogSpy).toHaveBeenCalledWith(wrapper.props().title);

  consoleLogSpy.mockRestore();
});
