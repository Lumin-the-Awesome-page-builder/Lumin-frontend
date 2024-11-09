import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Editor from '@/components/editor/Editor.vue';
import EditorPlugin from '@/editor/plugin.ts';
import router from '@/router';
import { createPinia, setActivePinia } from 'pinia';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import useEditorStore from '@/store/editor.store.ts';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

vi.mock('naive-ui', async (importOriginal) => {
  const mod = await importOriginal(); // type is inferred
  return {
    ...mod,
    useNotification: vi.fn(() => 'notificationStore'),
  };
});

vi.mock('@/store/editor.store.ts', () => {
  const useById = vi.fn();
  const setApp = vi.fn();
  const placeBlock = vi.fn(() => ({ parent: 'parent' }));
  const save = vi.fn(() => ({ toastIfError: () => {} }));
  return {
    default: () => ({
      useById,
      getTree: '{}',
      setApp,
      save,
      anyBlockPicked: true,
      blockOnSetup: 'setup',
      placeBlock,
    }),
  };
});

vi.mock('@/store/component-setup.store.ts', () => {
  const selectComponent = vi.fn(() => ({ toastIfError: () => {} }));
  const patchTree = vi.fn(() => ({ toastIfError: () => {} }));
  const saveWidget = vi.fn(() => ({ toastIfError: () => {} }));
  return {
    default: () => ({
      selectComponent,
      patchTree,
      saveWidget,
    }),
  };
});

vi.mock('@/store/widget-library.store.ts', () => {
  const loadWidgets = vi.fn(() => ({ toastIfError: () => {} }));
  return {
    default: () => ({
      loadWidgets,
    }),
  };
});

vi.mock('@/utils/token.util.ts', () => ({
  default: {
    getAuthorized: vi.fn(() => ({ id: 123 })),
  },
}));

describe('Editor component', async () => {
  const root = document.createElement('div');
  root.id = 'app-builder';
  document.body.appendChild(root);
  let wrapper;
  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(Editor, {
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
  });

  it('Test mounting base tree', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.editorStore.useById).toBeCalledWith(123);
  });

  it('select component test', async () => {
    const component = '';
    const componentSetupStore = useComponentSetupStore();

    await wrapper.vm.selectComponent(component);

    expect(componentSetupStore.selectComponent).toBeCalledWith(component);
  });

  describe('remove component test', () => {
    it('dont have parent', async () => {
      const component = { key: 123 };
      const editorStore = useEditorStore();
      wrapper.vm.app = {
        remove: vi.fn(() => false),
      };

      await wrapper.vm.removeComponent(component);

      expect(editorStore.save).toBeCalled();
      expect(wrapper.vm.app.remove).toBeCalledWith(123);
    });

    it('have parent', async () => {
      const component = { key: 123 };
      const componentSetupStore = useComponentSetupStore();
      wrapper.vm.app = {
        remove: vi.fn(() => true),
      };

      await wrapper.vm.removeComponent(component);

      expect(componentSetupStore.patchTree).toBeCalledWith(true);
      expect(wrapper.vm.app.remove).toBeCalledWith(123);
    });
  });

  describe('move component test', () => {
    it('dont have parent', async () => {
      const editorStore = useEditorStore();
      wrapper.vm.app = {
        move: vi.fn(() => false),
      };

      await wrapper.vm.moveComponent(true);

      expect(editorStore.save).toBeCalled();
      expect(wrapper.vm.app.move).toBeCalledWith('setup', true);
    });

    it('have parent', async () => {
      const componentSetupStore = useComponentSetupStore();
      wrapper.vm.app = {
        move: vi.fn(() => true),
      };

      await wrapper.vm.moveComponent(true);

      expect(componentSetupStore.patchTree).toBeCalledWith(true);
      expect(wrapper.vm.app.move).toBeCalledWith('setup', true);
    });
  });

  describe('place block test', () => {
    it('place to root', async () => {
      const pickedMock = {
        icon: {
          remove: vi.fn(),
        },
      };
      const parent = 'parent';
      const editorStore = useEditorStore();

      await wrapper.vm.placeBlock(pickedMock, parent);

      expect(pickedMock.icon.remove).toBeCalled();
      expect(editorStore.placeBlock).toBeCalledWith(parent);
    });

    it('place to root', async () => {
      const pickedMock = {
        icon: {
          remove: vi.fn(),
        },
      };
      const parent = 'parent';
      const componentSetupStore = useComponentSetupStore();
      const editorStore = useEditorStore();

      await wrapper.vm.placeBlock(pickedMock, parent);

      expect(pickedMock.icon.remove).toBeCalled();
      expect(editorStore.placeBlock).toBeCalledWith(parent);
      expect(componentSetupStore.patchTree).toBeCalledWith('parent');
    });
  });
});
