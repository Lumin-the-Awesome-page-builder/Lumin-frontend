import { shallowMount } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import SignupView from '@/views/SignupView.vue';
import RegistrationComponent from '@/components/RegistrationComponent.vue';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

test('renders RegistrationComponent', () => {
  const wrapper = shallowMount(SignupView);
  const registrationComponent = wrapper.findComponent(RegistrationComponent);
  expect(registrationComponent.exists()).toBe(true); // Проверяем, что RegistrationComponent рендерится
});
