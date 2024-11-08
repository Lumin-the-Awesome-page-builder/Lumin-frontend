import { mount } from '@vue/test-utils';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('Test header component', () => {
  let wrapper;
  let routerMock;
  let vm;
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
    wrapper.vm.dashboardStore = {
      loadProjects: vi.fn(),
      loadWidgets: vi.fn(),
      removeSelected: vi.fn(),
      downloadSelected: vi.fn(),
    };
    wrapper.vm.editorStore = {
      openNew: vi.fn(() => ({ id: 1 })),
    };
    vm = wrapper.vm;
  });

  it('contains correct navigation texts', async () => {
    const navElements = await wrapper.findAll('.nav-element');

    expect(navElements[0].text()).toContain('Библиотека проектов');
    expect(navElements[1].text()).toContain('Библиотека виджетов');
    expect(navElements[2].text()).toContain('Маркетплейс');
    expect(navElements[3].text()).toContain('Backend');
  });

  it('renders buttons with correct labels', async () => {
    const createButton = await wrapper.findAll('n-button')[0];
    const deleteButton = await wrapper.findAll('n-button')[1];
    const downloadButton = await wrapper.findAll('n-button')[2];

    expect(createButton.text()).toContain('Создать');
    expect(deleteButton.text()).toContain('Удалить');
    expect(downloadButton.text()).toContain('Скачать');
  });

  it('Test load projects', () => {
    vm.loadProjects();

    expect(vm.dashboardStore.loadProjects).toBeCalled();
  });

  it('Test load widgets', () => {
    vm.loadWidgets();

    expect(vm.dashboardStore.loadWidgets).toBeCalled();
  });

  it('Test create project', async () => {
    await vm.createProject();

    expect(vm.editorStore.openNew).toBeCalled();
    expect(routerMock.push).toBeCalledWith({ path: `/project/${1}/edit` });
  });

  it('Test remove selected', () => {
    vm.removeSelected();

    expect(vm.dashboardStore.removeSelected).toBeCalled();
  });

  it('Test download selected', () => {
    vm.downloadSelected();

    expect(vm.dashboardStore.downloadSelected).toBeCalled();
  });

  it('Test logout button', () => {
    vm.logout();
    expect(vm.logout).toBeCalled();
  });
});
