import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import SignupView from '@/views/SignupView.vue';
import RegistrationComponent from '@/components/RegistrationComponent.vue';

const wrapper = mount(SignupView);

test('renders RegistrationComponent', () => {
  const loginComponent = wrapper.findComponent(RegistrationComponent);
  expect(loginComponent.exists()).toBe(true); // Проверяем, что RegistrationComponent рендерится
});
