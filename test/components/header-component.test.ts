import { mount } from '@vue/test-utils';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

vi.mock('naive-ui', () => {
  return {
    useNotification: vi.fn(() => 'notificationStore'),
  };
});

describe('Test header component', () => {
  let wrapper;
  let routerMock;
  let vm;
  let toastIfErrorMock;
  let getDataMock;
  beforeEach(() => {
    setActivePinia(createPinia());
    routerMock = { push: vi.fn() };
    wrapper = mount(HeaderComponent, {
      global: {
        mocks: {
          $router: routerMock,
        },
      },
    });
    wrapper.vm.logout = vi.fn();
    toastIfErrorMock = vi.fn();
    wrapper.vm.dashboardStore = {
      loadProjects: vi.fn(() => ({ toastIfError: toastIfErrorMock })),
      loadWidgets: vi.fn(() => ({ toastIfError: toastIfErrorMock })),
      removeSelected: vi.fn(() => [
        { toastIfError: toastIfErrorMock },
        { toastIfError: toastIfErrorMock },
        { toastIfError: toastIfErrorMock },
      ]),
      downloadSelected: vi.fn(() => [
        { toastIfError: toastIfErrorMock },
        { toastIfError: toastIfErrorMock },
        { toastIfError: toastIfErrorMock },
      ]),
    };
    getDataMock = vi.fn(() => ({
      id: 1,
    }));
    wrapper.vm.editorStore = {
      openNew: vi.fn(() => ({
        id: 1,
        success: true,
        getData: getDataMock,
        toastIfError: toastIfErrorMock,
      })),
    };
    vm = wrapper.vm;
  });

  it('Contains correct navigation texts', async () => {
    const navElements = await wrapper.findAll('.nav-element');

    expect(navElements[0].text()).toContain('Библиотека проектов');
    expect(navElements[1].text()).toContain('Библиотека виджетов');
    expect(navElements[2].text()).toContain('Маркетплейс');
    expect(navElements[3].text()).toContain('Backend');
  });

  it('Renders buttons with correct labels', async () => {
    const createButton = await wrapper.findAll('n-button')[0];
    const deleteButton = await wrapper.findAll('n-button')[1];
    const downloadButton = await wrapper.findAll('n-button')[2];

    expect(createButton.text()).toContain('Создать');
    expect(deleteButton.text()).toContain('Удалить');
    expect(downloadButton.text()).toContain('Скачать');
  });

  it('Test load projects', async () => {
    await vm.loadProjects();

    expect(vm.dashboardStore.loadProjects).toBeCalled();
    expect(toastIfErrorMock).toBeCalledWith('notificationStore');
  });

  it('Test load widgets', async () => {
    await vm.loadWidgets();

    expect(vm.dashboardStore.loadWidgets).toBeCalled();
    expect(toastIfErrorMock).toBeCalledWith('notificationStore');
  });

  it('Test create project', async () => {
    await vm.createProject();

    expect(vm.editorStore.openNew).toBeCalled();
    expect(getDataMock).toBeCalled();
    expect(routerMock.push).toBeCalledWith({ path: `/project/${1}/edit` });
  });

  it('Test remove selected', async () => {
    await vm.removeSelected();

    expect(vm.dashboardStore.removeSelected).toBeCalled();
    expect(toastIfErrorMock).toBeCalledTimes(3);
    expect(toastIfErrorMock).toBeCalledWith('notificationStore');
  });

  it('Test download selected', async () => {
    await vm.downloadSelected();

    expect(vm.dashboardStore.downloadSelected).toBeCalled();
    expect(toastIfErrorMock).toBeCalledTimes(3);
    expect(toastIfErrorMock).toBeCalledWith('notificationStore');
  });

  it('Test logout button', () => {
    vm.logout();
    expect(vm.logout).toBeCalled();
  });
});
