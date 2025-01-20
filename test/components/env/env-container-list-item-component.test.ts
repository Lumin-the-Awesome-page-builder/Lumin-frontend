import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import EnvContainerListItemComponent from '@/components/env/EnvContainerListItemComponent.vue';

describe('env-container-list-item-component-test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('render correctly', () => {
    const wrapper = mount(EnvContainerListItemComponent, {});

    expect(wrapper.findComponent(EnvContainerListItemComponent).exists()).toBe(
      true,
    );
  });
});
