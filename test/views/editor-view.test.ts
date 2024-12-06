import { shallowMount } from '@vue/test-utils';
import Editor from '@/components/editor/Editor.vue';
import { describe, it, expect, vi } from 'vitest';
import EditorView from '@/views/EditorView.vue';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('EditorView', () => {
  it('renders all child components', () => {
    const wrapper = shallowMount(EditorView);

    expect(wrapper.findComponent(Editor).exists()).toBe(true);
  });
});
