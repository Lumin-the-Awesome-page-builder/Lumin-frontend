import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import CreateEnvFromConfiguration from '@/components/env/CreateEnvFromConfiguration.vue';

describe('create-env-from-configuration-test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('render correctly', () => {
    const wrapper = mount(CreateEnvFromConfiguration, {});

    expect(wrapper.findComponent(CreateEnvFromConfiguration).exists()).toBe(
      true,
    );
  });
});
