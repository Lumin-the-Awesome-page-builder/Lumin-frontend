import { it, expect, vi, describe, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ContainerView from '@/views/ContainerView.vue';
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

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
    const wrapper = shallowMount(ContainerView, {
      global: {
        mocks: {
          $route: {
            params: {
              envId: 1,
            },
          },
        },
      },
    });
    const envDashboardComponent = wrapper.findComponent(EnvDashboardComponent);
    expect(envDashboardComponent.exists()).toBe(true);
  });
});
