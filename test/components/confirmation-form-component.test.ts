import { mount } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import ConfirmationFormComponent from '@/components/ConfirmationFormComponent.vue';

vi.mock("codemirror-editor-vue3", async () => {
  return {
    default: (await import('@/components/editor/UI/CodeMirrorMock.vue'))
  }
})


const wrapper = mount(ConfirmationFormComponent);

test('renders correctly', () => {
  expect(wrapper.find('.container').exists()).toBe(true);
  expect(wrapper.find('.container_title').text()).toBe('Подтверждение');
  expect(wrapper.find('.user_title').text()).toBe(
    'Только для нового пользователя',
  );
  expect(wrapper.findAll('.block_title').length).toBe(2);
  expect(wrapper.find('n-input').exists()).toBe(true);
  expect(wrapper.find('n-button').text()).toBe('Войти');
});
