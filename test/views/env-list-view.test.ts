import { it, expect, vi, describe, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import EnvListView from '@/views/EnvListView.vue';
import { createPinia, setActivePinia } from 'pinia';
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('Container View Test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('renders correctly', () => {
    const wrapper = shallowMount(EnvListView, {});
    const loginComponent = wrapper.findComponent(EnvDashboardComponent);
    expect(loginComponent.exists()).toBe(true);
  });
});
