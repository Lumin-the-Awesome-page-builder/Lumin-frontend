import { shallowMount } from '@vue/test-utils';
import Editor from '@/components/editor/Editor.vue';
import { describe, it, expect } from 'vitest';
import EditorView from '@/views/EditorView.vue';

describe('EditorView', () => {
  it('renders all child components', () => {
    const wrapper = shallowMount(EditorView);

    expect(wrapper.findComponent(Editor).exists()).toBe(true);
  });
});
