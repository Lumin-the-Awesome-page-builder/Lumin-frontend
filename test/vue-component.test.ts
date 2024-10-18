import { it, expect, describe, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VueComponent from '@/views/VueComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('Vue component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Bob updates due to h1 is clicked', async () => {
    const wrapper = mount(VueComponent, {});

    await wrapper.find('h1').trigger('click');

    const h1Content = wrapper.find('h1').text();

    expect(h1Content).toBe('BOB2');
  });
});
