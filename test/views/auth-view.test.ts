import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import AuthView from '@/views/AuthView.vue';
import LoginComponent from '@/components/LoginComponent.vue';

const wrapper = mount(AuthView);

test('renders LoginComponent', () => {
  const loginComponent = wrapper.findComponent(LoginComponent);
  expect(loginComponent.exists()).toBe(true); // Проверяем, что LoginComponent рендерится
});
