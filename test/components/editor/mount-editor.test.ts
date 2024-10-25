import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Editor from '@/components/editor/Editor.vue';
import EditorPlugin from '@/editor/plugin.ts'
import router from '@/router';

describe('Editor component', async () => {
  it('Test mounting base tree', () => {

    const jsonData = JSON.stringify([
      {
        key: 'data-123-div-1729624518542',
        name: 'container',
        attrs: [],
        props: [
          { name: 'flex', value: 'flex' },
          { name: 'flex-wrap', value: 'flex-wrap' },
          { name: 'gap', value: 'g2' },
        ],

        content: null,
        children: [
          {
            key: 'data-123-div-1729624518123',
            name: 'container',
            attrs: [],
            props: [{ name: 'flex', value: 'flex' }],
            content: 'Test content',
          },
          {
            key: 'data-123-div-1729624518545',
            name: 'container',
            attrs: [],
            props: [{ name: 'flex', value: 'flex' }],
            content: 'Test content',
          },
          {
            key: 'data-123-div-1729624518547',
            name: 'container',
            attrs: [],
            props: [{ name: 'flex', value: 'flex' }],
            content: '',
          },
        ],
      },
    ]);

    const wrapper = mount(Editor, {
      attachTo: document.body,
      props: {
        initialTree: jsonData
      },
      global: {
        mocks: {
          $route: { },
        },
        plugins: [router, EditorPlugin],
      },
    });

    expect(wrapper.find("[data-123-div-1729624518123]").exists()).toBe(true)
  });
});