import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import Workspace from '@/components/editor/Workspace.vue';

describe('Workflow component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Workflow renders correctly', async () => {

    const wrapper = mount(Workspace, {});

    expect(wrapper.findComponent(Workspace).exists()).toBe(true);
    expect(wrapper.find('#app-builder').exists()).toBe(true);
  });
});