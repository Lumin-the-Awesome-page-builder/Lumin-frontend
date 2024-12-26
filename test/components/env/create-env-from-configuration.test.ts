import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CreateEnvFromConfiguration from '@/components/env/CreateEnvFromConfiguration.vue';
import EnvConfigurationOption from '@/components/env/EnvConfigurationOption.vue';
import EnvConfigurationSetup from '@/components/env/EnvConfigurationSetup.vue';

vi.mock('@/store/create-env.store', () => {
  return {
    default: vi.fn(() => ({
      configurations: [
        { id: 1, name: 'Config 1' },
        { id: 2, name: 'Config 2' },
      ],
      selectedConf: 0,
    })),
  };
});

describe('CreateEnvFromConfiguration.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CreateEnvFromConfiguration);
  });

  it('renders correctly', () => {
    expect(wrapper.find('.page-header').exists()).toBe(true);
    expect(wrapper.find('.page-heading').text()).toBe('Выбор конфигурации');
  });

  it('renders EnvConfigurationOption components for each configuration', () => {
    const options = wrapper.findAllComponents(EnvConfigurationOption);
    expect(options.length).toBe(2);

    expect(options[0].props('id')).toBe(1);
    expect(options[0].props('name')).toBe('Config 1');

    expect(options[1].props('id')).toBe(2);
    expect(options[1].props('name')).toBe('Config 2');
  });

  it('does not render EnvConfigurationSetup when no configuration is selected', () => {
    expect(wrapper.findComponent(EnvConfigurationSetup).exists()).toBe(false);
  });

  it('updates selected configuration on changeSelected call', async () => {
    wrapper.vm.changeSelected(2);
    expect(wrapper.vm.createEnvStore.selectedConf).toBe(2);
  });
});
