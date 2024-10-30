import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import LoginComponent from '@/components/LoginComponent.vue';
import { EyeOff, EyeSharp } from '@vicons/ionicons5';

const wrapper = mount(LoginComponent);

test('displays email and password labels correctly', () => {
  const emailLabel = wrapper.find('.block_title.title');
  const passwordLabel = wrapper.findAll('.block_title.title')[1];

  expect(emailLabel.text()).toBe('Адрес эл. почты');
  expect(passwordLabel.text()).toBe('Пароль');
});

test('toggles password visibility', () => {
  expect(wrapper.vm.typeInput).toBe('password');
  expect(wrapper.vm.icon).toStrictEqual(EyeSharp);

  wrapper.vm.showPassword();

  expect(wrapper.vm.typeInput).toBe('text');
  expect(wrapper.vm.icon).toStrictEqual(EyeOff);

  wrapper.vm.showPassword();

  expect(wrapper.vm.typeInput).toBe('password');
  expect(wrapper.vm.icon).toStrictEqual(EyeSharp);
});
