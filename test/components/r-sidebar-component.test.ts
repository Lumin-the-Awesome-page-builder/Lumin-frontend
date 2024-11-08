import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import RSidebarComponent from '@/components/editor/RSidebarComponent.vue';
import Container from '@/editor/components/Container.ts';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import useEditorStore from '@/store/editor.store.ts';
import useProjectPreviewModalStore from '@/store/project-preview-modal.store.ts';

vi.mock('naive-ui', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNotification: vi.fn(() => 'notificationStore'),
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
    wrapper.vm.editorStore = {
      save: vi.fn(() => ({ toastIfError: toastIfErrorMock })),
    };

    const result = await wrapper.vm.save();

    expect(result).toEqual({ toastIfError: toastIfErrorMock });
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
    wrapper.vm.save = vi.fn(() => ({
      success: true,
      toastIfError: toastIfErrorMock,
    }));

    await wrapper.vm.exit();

    expect(wrapper.vm.save).toBeCalled();
    expect(toastIfErrorMock).toBeCalled();
    expect(routerMock).toBeCalledWith({ path: '/dashboard' });
  });
});
