import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import Controls from '@/components/editor/Controls.vue';
describe('Control component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Control renders correctly', async () => {

    const wrapper = mount(Controls, {});


    expect(wrapper.findComponent(Controls).exists()).toBe(true);
    expect(wrapper.find('[class]').attributes()["class"]).toBe('editor-controls');
  });
});