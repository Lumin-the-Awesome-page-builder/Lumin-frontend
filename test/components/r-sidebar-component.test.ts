import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import RSidebarComponent from '@/components/editor/RSidebarComponent.vue';
import Container from '@/editor/components/Container.ts';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import useEditorStore from '@/store/editor.store.ts';
import useProjectPreviewModalStore from '@/store/project-preview-modal.store.ts';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('RSidebarComponent test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test save method', async () => {
    const container = new Container('div');
    container.availableProps = [];
    RSidebarComponent.setup = vi.fn(() => {
      const componentStore = useComponentSetupStore();
      componentStore.selectComponent(container);

      return {
        editorStore: useEditorStore(),
        projectPreviewModalStore: useProjectPreviewModalStore(),
        componentSetupStore: componentStore,
      };
    });
    const wrapper = mount(RSidebarComponent);
    wrapper.vm.editorStore = { save: vi.fn(() => true) };
    await wrapper.vm.save();

    expect(wrapper.vm.editorStore.save).toBeCalled();
  });

  it('Test exit method', async () => {
    const container = new Container('div');
    container.availableProps = [];
    RSidebarComponent.setup = vi.fn(() => {
      const componentStore = useComponentSetupStore();
      componentStore.selectComponent(container);
      const editorStore = useEditorStore();
      editorStore.blockOnCreate = { icon: null, component: null };
      return {
        editorStore: useEditorStore(),
        projectPreviewModalStore: useProjectPreviewModalStore(),
        componentSetupStore: componentStore,
      };
    });
    const routerMock = vi.fn();
    const wrapper = mount(RSidebarComponent, {
      global: {
        mocks: {
          $router: {
            push: routerMock,
          },
        },
      },
    });
    wrapper.vm.save = vi.fn();

    await wrapper.vm.exit();

    expect(wrapper.vm.save).toBeCalled();
    expect(routerMock).toBeCalledWith({ path: '/dashboard' });
  });
});
