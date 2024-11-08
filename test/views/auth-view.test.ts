import { mount } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import AuthView from '@/views/AuthView.vue';
import LoginComponent from '@/components/LoginComponent.vue';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

const wrapper = mount(AuthView);

test('renders LoginComponent', () => {
  const loginComponent = wrapper.findComponent(LoginComponent);
  expect(loginComponent.exists()).toBe(true); // Проверяем, что LoginComponent рендерится
});
