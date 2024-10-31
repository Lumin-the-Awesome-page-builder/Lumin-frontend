import { mount } from '@vue/test-utils';
import { it, expect, describe, beforeEach } from 'vitest';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('Test header component', () => {
  let wrapper;
  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(HeaderComponent);
  });

  it('contains correct navigation texts', async () => {
    const navElements = await wrapper.findAll('.nav-element');

    expect(navElements[0].text()).toContain('Библиотека проектов');
    expect(navElements[1].text()).toContain('Библиотека виджетов');
    expect(navElements[2].text()).toContain('Маркетплейс');
    expect(navElements[3].text()).toContain('Backend');
  });

  it('renders buttons with correct labels', async () => {
    const createButton = await wrapper.findAll('n-button')[0];
    const deleteButton = await wrapper.findAll('n-button')[1];
    const downloadButton = await wrapper.findAll('n-button')[2];

    expect(createButton.text()).toContain('Создать');
    expect(deleteButton.text()).toContain('Удалить');
    expect(downloadButton.text()).toContain('Скачать');
  });
});
