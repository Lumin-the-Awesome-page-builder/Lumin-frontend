import { test, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AuthView from '@/views/AuthView.vue';
import LoginComponent from '@/components/LoginComponent.vue';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

test('renders LoginComponent', () => {
  const wrapper = shallowMount(AuthView);
  const loginComponent = wrapper.findComponent(LoginComponent);
  expect(loginComponent.exists()).toBe(true); // Проверяем, что LoginComponent рендерится
});
