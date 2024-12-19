import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import RSidebarComponent from '@/components/editor/RSidebarComponent.vue';
import Container from '@/editor/components/Container.ts';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import useEditorStore from '@/store/editor.store.ts';
import useProjectPreviewModalStore from '@/store/project-preview-modal.store.ts';
import useChangeDataStore from '@/store/modals/change-data-project-component.store.ts';
import { useChooseDomainStore } from '@/store/modals/choose-domen-component.store.ts';
import useDashboardStore from '@/store/dashboard.store.ts';

vi.mock('naive-ui', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNotification: vi.fn(() => 'notificationStore'),
  };
});

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('RSidebarComponent test', () => {
  let toastIfErrorMock;
  beforeEach(() => {
    toastIfErrorMock = vi.fn();
    setActivePinia(createPinia());
  });

  it('Test save method', async () => {
    const container = new Container('div');
    container.availableProps = [];
    const blockComponent = vi.fn();
    RSidebarComponent.setup = vi.fn(() => {
      const componentStore = useComponentSetupStore();
      componentStore.ws = { blockComponent };
      componentStore.selectComponent(container);
      RSidebarComponent.computed.projectName = vi.fn(() => {
        return 'name';
      });
      RSidebarComponent.computed.projectCategory = vi.fn(() => {
        return 123;
      });
      RSidebarComponent.computed.projectTags = vi.fn(() => {
        return '#123';
      });
      return {
        chooseDomainStore: useChooseDomainStore(),
        changeProjectDataStore: useChangeDataStore(),
        editorStore: useEditorStore(),
        projectPreviewModalStore: useProjectPreviewModalStore(),
        componentSetupStore: componentStore,
      };
    });
    const wrapper = mount(RSidebarComponent);
    const saveForms = vi.fn(() => [])
    wrapper.vm.editorStore = {
      save: vi.fn(() => ({ toastIfError: toastIfErrorMock })),
      saveForms
    };

    const result = await wrapper.vm.save();

    expect(blockComponent).toBeCalledWith(container);
    expect(result).toEqual({ toastIfError: toastIfErrorMock });
    expect(wrapper.vm.editorStore.save).toBeCalled();
    expect(saveForms).toBeCalled();
  });

  it('Test exit method', async () => {
    const container = new Container('div');
    container.availableProps = [];
    const updatePreviewMock = vi.fn(() => ({ toastIfError: () => {} }));
    const loadProjectsMock = vi.fn(() => ({ toastIfError: () => {} }));
    const closeEditingMock = vi.fn();
    const blockComponent = vi.fn();
    RSidebarComponent.setup = vi.fn(() => {
      const componentStore = useComponentSetupStore();
      componentStore.ws = { blockComponent };
      componentStore.selectComponent(container);
      const editorStore = useEditorStore();
      const dashboardStore = useDashboardStore();
      RSidebarComponent.computed.projectName = vi.fn(() => {
        return 'name';
      });
      RSidebarComponent.computed.projectCategory = vi.fn(() => {
        return 123;
      });
      RSidebarComponent.computed.projectTags = vi.fn(() => {
        return '#123';
      });
      editorStore.blockOnCreate = { icon: null, component: null };
      editorStore.updatePreview = updatePreviewMock;
      
      dashboardStore.loadProjects = loadProjectsMock;
      editorStore.ws = {
        closeEditing: closeEditingMock,
      };
      return {
        editorStore,
        projectPreviewModalStore: useProjectPreviewModalStore(),
        componentSetupStore: componentStore,
        dashboardStore,
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
    wrapper.vm.save = vi.fn(() => ({
      success: true,
      toastIfError: toastIfErrorMock,
    }));

    await wrapper.vm.exit();

    expect(blockComponent).toBeCalledWith(container);
    expect(wrapper.vm.save).toBeCalled();
    expect(closeEditingMock).toBeCalled();
    expect(toastIfErrorMock).toBeCalled();
    expect(updatePreviewMock).toBeCalled();
    expect(loadProjectsMock).toBeCalled();
    expect(routerMock).toBeCalledWith({ path: '/dashboard' });
  });
});
