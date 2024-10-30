import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import HeaderComponent from '@/components/HeaderComponent.vue';

const wrapper = mount(HeaderComponent);

test('contains correct navigation texts', () => {
  const navElements = wrapper.findAll('.nav-element');

  expect(navElements[0].text()).toContain('Библиотека проектов');
  expect(navElements[1].text()).toContain('Библиотека виджетов');
  expect(navElements[2].text()).toContain('Маркетплейс');
  expect(navElements[3].text()).toContain('Backend');
});

test('renders buttons with correct labels', () => {
  const deleteButton = wrapper.findAll('n-button')[0];
  const downloadButton = wrapper.findAll('n-button')[1];

  expect(deleteButton.text()).toContain('Удалить');
  expect(downloadButton.text()).toContain('Скачать');
});
