import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ConfigurationComponent from '@/components/СonfigurationСomponent.vue';

describe('ConfigurationComponent', () => {
  it('отображает правильный заголовок', () => {
    const wrapper = mount(ConfigurationComponent);
    const header = wrapper.find('.clickable-title');
    expect(header.text()).toContain('Создание окружения');
  });

  it('проверяет отображение поля для ввода названия окружения', () => {
    const wrapper = mount(ConfigurationComponent);
    const input = wrapper.find('.environment-input');
    expect(input.exists()).toBe(true);
  });

  it('проверяет правильное обновление модели при вводе в поле', async () => {
    const wrapper = mount(ConfigurationComponent);
    const input = wrapper.find('.environment-input');
    await input.setValue('Test Environment');
    expect(wrapper.vm.environmentName).toBe('Test Environment');
  });

  it('вызывает метод goBack при клике на заголовок', async () => {
    const wrapper = mount(ConfigurationComponent);
    const goBackSpy = vi.spyOn(wrapper.vm, 'goBack');
    const header = wrapper.find('.clickable-title');
    await header.trigger('click');
    expect(goBackSpy).toHaveBeenCalled();
  });

  it('вызывает метод useReadyConfig при клике на кнопку "Использовать готовую конфигурацию"', async () => {
    const wrapper = mount(ConfigurationComponent);
    const useReadyConfigSpy = vi.spyOn(wrapper.vm, 'useReadyConfig');
    const button = wrapper.find('.button-primary');
    await button.trigger('click');
    expect(useReadyConfigSpy).toHaveBeenCalled();
  });

  it('вызывает метод createNewConfig при клике на кнопку "Создать новую конфигурацию"', async () => {
    const wrapper = mount(ConfigurationComponent);
    const createNewConfigSpy = vi.spyOn(wrapper.vm, 'createNewConfig');
    const button = wrapper.findAll('.button-secondary').at(0);
    await button?.trigger('click');
    expect(createNewConfigSpy).toHaveBeenCalled();
  });

  it('вызывает метод saveEnvironment при клике на кнопку "Сохранить окружение"', async () => {
    const wrapper = mount(ConfigurationComponent);
    const saveEnvironmentSpy = vi.spyOn(wrapper.vm, 'saveEnvironment');
    const button = wrapper.findAll('.button-primary').at(1);
    await button?.trigger('click');
    expect(saveEnvironmentSpy).toHaveBeenCalled();
  });

  it('проверяет отображение опций конфигурации с чекбоксами', () => {
    const wrapper = mount(ConfigurationComponent);
    const configOptions = wrapper.findAll('.config-option');
    expect(configOptions.length).toBe(2);
  });

  it('проверяет обновление выбранной конфигурации при изменении чекбокса', async () => {
    const wrapper = mount(ConfigurationComponent);

    const checkboxes = wrapper.findAll('input[type="checkbox"]');

    const checkbox = checkboxes.find(
      (c) => (c.element as HTMLInputElement).value === 'NodeJS + PostgreSQL',
    );

    await checkbox.setValue(true);

    expect(wrapper.vm.selectedConfig).toContain('NodeJS + PostgreSQL');

    await checkbox.setValue(false);

    expect(wrapper.vm.selectedConfig).not.toContain('NodeJS + PostgreSQL');
  });
});
