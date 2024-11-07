import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Editor from '@/components/editor/Editor.vue';
import EditorPlugin from '@/editor/plugin.ts';
import router from '@/router';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/store/editor.store.ts', () => {
  const useById = vi.fn();
  const setApp = vi.fn();
  return {
    default: () => ({
      useById,
      getTree: '{}',
      setApp,
    }),
  };
});

vi.mock('@/store/component-setup.store.ts', () => {
  const selectComponent = vi.fn();
  return {
    default: () => ({
      selectComponent,
    }),
  };
});

vi.mock('@/utils/token.util.ts', () => ({
  default: {
    getAuthorized: vi.fn(() => ({ id: 123 })),
  },
}));

describe('Editor component', async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test mounting base tree', async () => {
    const root = document.createElement('div');
    root.id = 'app-builder';
    document.body.appendChild(root);
    const wrapper = shallowMount(Editor, {
      attachTo: document.body,
      global: {
        mocks: {
          $route: {
            params: {
              id: 123,
            },
          },
        },
        plugins: [router, EditorPlugin],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.editorStore.useById).toBeCalledWith(123);
  });
});
