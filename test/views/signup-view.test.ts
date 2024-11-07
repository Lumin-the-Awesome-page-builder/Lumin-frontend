import { shallowMount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import SignupView from '@/views/SignupView.vue';
import RegistrationComponent from '@/components/RegistrationComponent.vue';

const wrapper = shallowMount(SignupView);

test('renders RegistrationComponent', () => {
  const registrationComponent = wrapper.findComponent(RegistrationComponent);
  expect(registrationComponent.exists()).toBe(true); // Проверяем, что RegistrationComponent рендерится
});
