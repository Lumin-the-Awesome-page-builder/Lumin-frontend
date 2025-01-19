import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import EnvConfigurationSetup from '@/components/env/EnvConfigurationSetup.vue';

describe('env-configuration-setup-test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('render correctly', () => {
    const files = [
      {
        title: 'title',
        description: 'description',
      },
      {
        title: 'title',
        description: 'description',
      },
    ];
    const filesMock = vi.fn(() => {
      return files;
    });
    const selectedMock = vi.fn(() => {
      return 1;
    });
    const wrapper = mount(EnvConfigurationSetup, {
      props: {
        files,
      },
      computed: {
        selected: selectedMock,
        files: filesMock,
      },
    });

    expect(wrapper.findComponent(EnvConfigurationSetup).exists()).toBe(true);
  });
});
