import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import RSidebarComponent from '@/components/editor/RSidebarComponent.vue';

describe('RSidebarComponent test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test save method', async () => {
    const wrapper = mount(RSidebarComponent);
    wrapper.vm.editorStore = { save: vi.fn(() => true) };

    await wrapper.vm.save();

    expect(wrapper.vm.editorStore.save).toBeCalled();
  });
});
