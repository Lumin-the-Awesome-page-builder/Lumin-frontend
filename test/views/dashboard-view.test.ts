import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import DashboardView from '@/views/DashboardView.vue';

const wrapper = mount(DashboardView);

test('computes projectCount correctly', () => {
  expect(wrapper.vm.projectCount).toBe(wrapper.vm.data.length);
});

test('computes projectCount correctly', () => {
  expect(wrapper.vm.projectCount).toBe(wrapper.vm.data.length);
});

test.each([
  [0, 'проектов'],
  [1, 'проект'],
  [2, 'проекта'],
  [3, 'проекта'],
  [4, 'проекта'],
  [5, 'проектов'],
  [11, 'проектов'],
  [21, 'проект'],
  [22, 'проекта'],
  [25, 'проектов']
])('when projectCount is %i, projectLabel should be %s', (count, expectedLabel) => {
  wrapper.setData({ data: Array(count).fill({}) });
  expect(wrapper.vm.projectLabel).toBe(expectedLabel);
});