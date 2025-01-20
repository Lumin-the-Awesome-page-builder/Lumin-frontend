import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import EnvConfigurationOption from '@/components/env/EnvConfigurationOption.vue';

describe('env-configuration-option-test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('render correctly', () => {
    const wrapper = mount(EnvConfigurationOption, {});

    expect(wrapper.findComponent(EnvConfigurationOption).exists()).toBe(true);
  });
});
