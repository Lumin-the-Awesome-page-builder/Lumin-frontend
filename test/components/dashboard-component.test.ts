import { describe, it, expect, beforeEach, vi } from 'vitest';
import DashboardComponent from '@/components/DashboardComponent.vue';
import { mount } from '@vue/test-utils';
import CardComponent from '@/components/CardComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('DashboardComponent test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test correct rendering', async () => {
    const wrapper = mount(DashboardComponent);

    wrapper.dashboardStore = {
      getData: [],
      getType: 'project',
    };

    expect(wrapper.find('.page-heading').text()).toBe('Ваши проекты');
    expect(wrapper.find('.prj-count').text()).toBe('0 проектов');
    expect(wrapper.findAllComponents(CardComponent)).toHaveLength(0);
  });
});
