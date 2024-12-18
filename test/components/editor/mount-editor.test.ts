import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Editor from '@/components/editor/Editor.vue';
import EditorPlugin from '@/editor/plugin.ts';
import router from '@/router';
import { createPinia, setActivePinia } from 'pinia';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import useEditorStore from '@/store/editor.store.ts';
import ProjectWsModel from '@/api/modules/project/models/project-ws.model';

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

vi.mock('@/api/modules/project/models/project-ws.model', () => {
  return {
    default: class ProjectWsModelMock {
      constructor(
        public id: number,
        public access: string,
      ) {}
      static registerMock = vi.fn();
      static registerOnErrorMock = vi.fn();
      static registerOnCloseMock = vi.fn();
      static initMock = vi.fn();
      static authMock = vi.fn(() => ({
        success: false,
      }));
      register = ProjectWsModelMock.registerMock;
      registerOnError = ProjectWsModelMock.registerOnErrorMock;
      registerOnClose = ProjectWsModelMock.registerOnCloseMock;
      init = ProjectWsModelMock.initMock;
      auth = ProjectWsModelMock.authMock;
    },
  };
});

vi.mock('@/store/editor.store.ts', () => {
  const init = vi.fn(() => ({
    success: true,
    getData: () => ({
      project: { id: 1, shared: false, shared_marketplace: false },
      access: 'access',
    }),
  }));
  const setApp = vi.fn();
  const setWs = vi.fn();
  const placeBlock = vi.fn(() => ({ parent: 'parent' }));
  const generatePreview = vi.fn(() => 'preview');
  const save = vi.fn(() => ({ toastIfError: () => {} }));
  return {
    default: () => ({
      init,
      getTree: '{}',
      setApp,
      setWs,
      save,
      anyBlockPicked: true,
      blockOnSetup: 'setup',
      placeBlock,
      generatePreview,
      getProject: {
        id: 1,
        shared: true,
        shared_marketplace: false,
      },
    }),
  };
});

vi.mock('@/store/component-setup.store.ts', () => {
  const selectComponent = vi.fn(() => ({ toastIfError: () => {} }));
  const removeComponent = vi.fn(() => ({ toastIfError: () => {} }));
  const patchOrdering = vi.fn(() => ({ toastIfError: () => {} }));
  const patchTree = vi.fn(() => ({ toastIfError: () => {} }));
  const saveWidget = vi.fn(() => ({ toastIfError: () => {} }));
  const setWs = vi.fn();
  return {
    default: () => ({
      setWs,
      patchOrdering,
      removeComponent,
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

    expect(wrapper.vm.editorStore.init).toBeCalledWith(123);
    expect(ProjectWsModel.registerMock).toBeCalledTimes(7);
    expect(ProjectWsModel.registerOnErrorMock).toBeCalled();
    expect(ProjectWsModel.registerOnCloseMock).toBeCalled();
    expect(ProjectWsModel.initMock).toBeCalled();
    expect(ProjectWsModel.authMock).toBeCalled();
  });

  it('select component test', async () => {
    const component = '';
    const componentSetupStore = useComponentSetupStore();

    await wrapper.vm.selectComponent(component);

    expect(componentSetupStore.selectComponent).toBeCalledWith(component);
  });

  it('remove component test', async () => {
    const component = { key: 123, findTop: vi.fn(() => [{ key: 123 }]) };
    const componentSetupStore = useComponentSetupStore();
    const removeMock = vi.fn(() => true);
    wrapper.vm.app = {
      remove: removeMock,
    };

    await wrapper.vm.removeComponent(component);

    expect(componentSetupStore.removeComponent).toBeCalledWith([123]);
    expect(removeMock).toBeCalledWith(123);
  });

  it('move component in parent test', async () => {
    const componentSetupStore = useComponentSetupStore();
    const findTopMock = vi.fn(() => [{ key: 123 }]);
    const moveMock = vi.fn(() => ({
      findTop: findTopMock,
      childrenOrdering: [],
    }));
    wrapper.vm.app = {
      move: moveMock,
    };

    await wrapper.vm.moveComponentInParent(true);

    expect(findTopMock).toBeCalled();
    expect(componentSetupStore.patchOrdering).toBeCalledWith([123], []);
    expect(moveMock).toBeCalledWith('setup', true);
  });

  describe('place block test', () => {
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
      expect(componentSetupStore.patchTree).toBeCalledWith({
        parent: 'parent',
      });
    });
  });
});
