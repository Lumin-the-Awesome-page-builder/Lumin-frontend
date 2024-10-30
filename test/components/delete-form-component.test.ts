import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import DeleteFormComponent from '@/components/DeleteFormComponent.vue';

const wrapper = mount(DeleteFormComponent, {
  props: {
    projectName: 'Тестовый проект',
  },
});

test('accepts projectName prop', () => {
  const newProjectName = 'Тестовый проект';
  wrapper.setProps({ projectName: newProjectName });

  expect(wrapper.find('.block_title').text()).toContain(`Вы уверены, что хотите удалить ${newProjectName}?`);
});