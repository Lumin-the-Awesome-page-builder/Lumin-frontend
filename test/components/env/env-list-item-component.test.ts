import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import EnvListItemComponent from '@/components/env/EnvListItemComponent.vue';

describe('env-dashboard-component-test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('render correctly', () => {
    const wrapper = mount(EnvListItemComponent, {});

    expect(wrapper.findComponent(EnvListItemComponent).exists()).toBe(true);
  });
});
