import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import HelloFormComponent from '@/components/HelloFormComponent.vue';

const wrapper = mount(HelloFormComponent);

test('renders button with correct label', () => {
  const button = wrapper.find('n-button');
  expect(button.text()).toBe('Продолжить');
});