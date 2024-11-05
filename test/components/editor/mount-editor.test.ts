import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Editor from '@/components/editor/Editor.vue';
import EditorPlugin from '@/editor/plugin.ts';
import router from '@/router';
import { createPinia, setActivePinia } from 'pinia';

describe('Editor component', async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test mounting base tree', () => {
    const wrapper = mount(Editor, {
      attachTo: document.body,
      global: {
        mocks: {
          $route: {
            params: {
              id: 123
            }
          },
        },
        plugins: [router, EditorPlugin],
      },
    });

    expect(wrapper.find('[data-123-div-1729624518123]').exists()).toBe(false);
  });
});
