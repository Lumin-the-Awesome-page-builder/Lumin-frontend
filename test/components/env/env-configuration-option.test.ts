import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import EnvConfigurationOption from '@/components/env/EnvConfigurationOption.vue';

vi.mock('@/store/create-env.store', () => {
  return {
    default: vi.fn(() => ({
      selectedConf: 1, // Текущая выбранная конфигурация
      changeSelected: vi.fn(),
    })),
  };
});

describe('EnvConfigurationOption.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EnvConfigurationOption, {
      props: {
        id: 1,
        name: 'Config 1',
      },
    });
  });

  it('renders correctly', () => {
    const optionName = wrapper.find('.option-name');
    expect(optionName.exists()).toBe(true);
    expect(optionName.text()).toBe('Config 1');
  });

  it('sets selectedConf to id when changeSelected is called', async () => {
    const div = wrapper.find('.env-option');
    await div.trigger('click');

    expect(wrapper.vm.createEnvStore.selectedConf).toBe(1);
  });
});
