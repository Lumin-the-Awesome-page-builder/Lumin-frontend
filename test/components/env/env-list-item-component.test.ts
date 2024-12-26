import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import EnvListItemComponent from '@/components/env/EnvListItemComponent.vue'; // Путь к компоненту

describe('EnvListItemComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EnvListItemComponent, {
      props: {
        name: 'Test Environment',
      },
    });
  });

  it('renders correctly with the name prop', () => {
    const nameText = wrapper.find('.nameText');
    expect(nameText.exists()).toBe(true);
    expect(nameText.text()).toBe('Test Environment');
  });

  it('renders a button with the text "Редактировать"', () => {
    const button = wrapper.find('n-button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Редактировать');
  });
});
