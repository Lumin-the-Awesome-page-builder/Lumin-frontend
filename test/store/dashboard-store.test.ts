import { beforeEach, describe, vi, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useDashboardStore from '@/store/dashboard.store.ts';
import LibraryModel from '@/api/modules/library/models/library.model.ts';
import ProjectModel from '@/api/modules/project/models/project.model.ts';
import WidgetModel from '@/api/modules/widget/models/widget.model.ts';
import { getEditorInstance } from '@/editor/plugin.ts';
import appConf from '@/api/conf/app.conf.ts';

vi.mock('@/editor/plugin.ts', () => ({
  getEditorInstance: vi.fn(() => ({
    initState: '',
  })),
}));

vi.mock('@/editor/core/Packager.ts', () => ({
  default: function () {
    this.blob = vi.fn(() => 'blob');
    this.constructor = function () {
      return this;
    };
  },
}));

const fileMock = vi.fn();
const generateAsyncMock = vi.fn(() => 'zipped');
vi.mock('jszip', () => {
  return {
    default: vi.fn(() => ({
      file: fileMock,
      generateAsync: generateAsyncMock,
    })),
  };
});

const data = {
  getData: vi.fn(() => ({ name: 'name', data: 'data' })),
};

vi.mock('@/api/modules/project/models/project.model.ts', () => {
  return {
    default: {
      delete: vi.fn(() => 'projectResult'),
      getOne: vi.fn(() => data),
    },
  };
});

vi.mock('@/api/modules/widget/models/widget.model.ts', () => {
  return {
    default: {
      delete: vi.fn(() => 'widgetResult'),
      getOne: vi.fn(() => data),
    },
  };
});

vi.mock('@/api/modules/library/models/library.model.ts', () => {
  const getProjectsResult = {
    success: true,
    getData: vi.fn(() => 'projects'),
  };
  const getWidgetsResult = {
    success: true,
    getData: vi.fn(() => 'widgets'),
  };
  return {
    default: {
      getProjects: vi.fn(() => getProjectsResult),
      getWidgets: vi.fn(() => getWidgetsResult),
    },
  };
});

describe('Dashboard store tests', () => {
  let store: any;
  beforeEach(() => {
    vi.restoreAllMocks();
    setActivePinia(createPinia());
    store = useDashboardStore();
  });

  it('Test createBlob', () => {
    const parseMock = vi.fn(() => 'state');

    vi.stubGlobal('JSON', {
      parse: parseMock,
    });

    const res = store.createBlob('test');

    expect(parseMock).toBeCalledWith('test');
    expect(getEditorInstance).toBeCalledTimes(1);
    expect(res).toBe('blob');
  });

  it('Test createLink', () => {
    const clickMock = vi.fn();
    const linkObject = {
      href: '',
      download: null,
      click: clickMock,
    };
    const createElementMock = vi.fn(() => linkObject);
    const appendChildMock = vi.fn();
    const removeChildMock = vi.fn();
    const createObjectMock = vi.fn(() => 'object-url');
    vi.stubGlobal('document', {
      createElement: createElementMock,
      body: {
        appendChild: appendChildMock,
        removeChild: removeChildMock,
      },
    });
    vi.stubGlobal('URL', {
      createObjectURL: createObjectMock,
    });

    store.createLink('name', 'blob');

    expect(createElementMock).toBeCalledWith('a');
    expect(createObjectMock).toBeCalledWith('blob');
    expect(linkObject.href).toBe('object-url');
    expect(linkObject.download).toBe('name');
    expect(appendChildMock).toBeCalledWith(linkObject);
    expect(linkObject.click).toBeCalled();
    expect(removeChildMock).toBeCalledWith(linkObject);
  });

  it('Test load projects', async () => {
    const result = await store.loadProjects();

    expect(LibraryModel.getProjects).toBeCalled();
    expect(store.data).toBe('projects');
    expect(store.contentType).toBe('project');
    expect(result).toEqual({ ...(await LibraryModel.getProjects()) });
  });

  it('Test load widgets', async () => {
    const result = await store.loadWidgets();

    expect(LibraryModel.getWidgets).toBeCalled();
    expect(store.data).toBe('widgets');
    expect(store.contentType).toBe('widget');
    expect(result).toEqual({ ...(await LibraryModel.getWidgets()) });
  });

  describe('Test toggle selected', () => {
    it('Test remove', () => {
      store.selected = { 123: true };

      store.toggleSelected(123);

      expect(store.selected).toStrictEqual({});
    });

    it('Test select', () => {
      store.selected = {};

      store.toggleSelected(123);

      expect(store.selected).toStrictEqual({ 123: true });
    });
  });

  describe('Test getters', () => {
    const item = { preview: 'prev.png', created_at: 123 };
    const contentType = 'project';
    const selected = { 123: true };

    it('Test data getter', () => {
      store.data = [item];

      const result = store.getData;

      expect(result).toStrictEqual([
        {
          ...item,
          date: new Date(item.created_at),
          preview: `${appConf.proto}://${appConf.endpoint}/lumin/file/${item.preview}`,
        },
      ]);
    });

    it('Test type getter', () => {
      store.contentType = contentType;

      const result = store.getType;

      expect(result).toBe(contentType);
    });

    it('Test selected getter', () => {
      store.selected = selected;

      const result = store.getSelected;

      expect(result).toStrictEqual(selected);
    });
  });

  describe('Test removeById', () => {
    it('ContentType is "project"', async () => {
      const id = '1';
      store.contentType = 'project';
      const result = await store.removeById(id);

      expect(ProjectModel.delete).toBeCalledWith(Number(id));
      expect(WidgetModel.delete).toBeCalledTimes(0);
      expect(result).equal('projectResult');
    });

    it('ContentType is "widget"', async () => {
      const id = '1';
      store.contentType = 'widget';
      const result = await store.removeById(id);

      expect(WidgetModel.delete).toBeCalledWith(Number(id));
      expect(ProjectModel.delete).toBeCalledTimes(0);
      expect(result).equal('widgetResult');
    });
  });

  describe('Test removeSelected', async () => {
    beforeEach(() => {
      store.loadProjects = vi.fn(() => 'loadProjectsResult');
      store.loadWidgets = vi.fn(() => 'loadWidgetsResult');
      store.removeById = vi.fn(() => 'id');
      store.selected = { '1': true, '2': true, '3': true };
    });
    it('ContentType is "project"', async () => {
      store.contentType = 'project';
      const result = await store.removeSelected();

      expect(store.removeById).toBeCalledTimes(3);
      expect(store.removeById).toBeCalledWith('1', 0, ['1', '2', '3']);
      expect(store.removeById).toBeCalledWith('2', 1, ['1', '2', '3']);
      expect(store.removeById).toBeCalledWith('3', 2, ['1', '2', '3']);
      expect(store.loadProjects).toBeCalledTimes(1);
      expect(store.loadWidgets).toBeCalledTimes(0);
      expect(store.selected).toEqual({});
      expect(result).toEqual(['id', 'id', 'id', 'loadProjectsResult']);
    });
    it('ContentType is "widget"', async () => {
      store.contentType = 'widget';
      const result = await store.removeSelected();

      expect(store.removeById).toBeCalledTimes(3);
      expect(store.removeById).toBeCalledWith('1', 0, ['1', '2', '3']);
      expect(store.removeById).toBeCalledWith('2', 1, ['1', '2', '3']);
      expect(store.removeById).toBeCalledWith('3', 2, ['1', '2', '3']);
      expect(store.loadProjects).toBeCalledTimes(0);
      expect(store.loadWidgets).toBeCalledTimes(1);
      expect(result).toEqual(['id', 'id', 'id', 'loadWidgetsResult']);
    });
  });

  describe('Test downloadProject', () => {
    let createBlobMock: any;
    let createLinkMock: any;
    const blob = 'blob';
    beforeEach(() => {
      createBlobMock = vi.fn(() => blob);
      createLinkMock = vi.fn();
      store.createBlob = createBlobMock;
      store.createLink = createLinkMock;
    });
    it('ContentType is "project"', async () => {
      const id = '1';

      const result = await store.downloadProject(id);

      expect(ProjectModel.getOne).toBeCalledWith(Number(id));
      expect(data.getData).toBeCalledTimes(1);
      expect(WidgetModel.getOne).toBeCalledTimes(0);
      expect(createBlobMock).toBeCalledWith(data.getData().data);
      expect(createLinkMock).toBeCalledWith(
        `${data.getData().name}.html`,
        blob,
      );
      expect(result).toEqual({ ...data });
    });

    it('ContentType is "widget"', async () => {
      const id = '1';
      store.contentType = 'widget';

      const result = await store.downloadProject(id);

      expect(WidgetModel.getOne).toBeCalledWith(Number(id));
      expect(data.getData).toBeCalledTimes(1);
      expect(ProjectModel.getOne).toBeCalledTimes(0);
      expect(createBlobMock).toBeCalledWith(data.getData().data);
      expect(createLinkMock).toBeCalledWith(
        `${data.getData().name}.html`,
        blob,
      );
      expect(result).toEqual({ ...data });
    });
  });

  describe('Test downloadSelected', () => {
    let createBlobMock: any;
    let createLinkMock: any;
    const blob = 'blob';
    beforeEach(() => {
      createBlobMock = vi.fn(() => blob);
      createLinkMock = vi.fn();
      store.createBlob = createBlobMock;
      store.createLink = createLinkMock;
      store.selected = { '1': true, '2': true, '3': true };
    });
    it('ContentType is "project"', async () => {
      const count = Object.keys(store.selected).length;

      const result = await store.downloadSelected();

      expect(ProjectModel.getOne).toBeCalledWith(1);
      expect(ProjectModel.getOne).toBeCalledWith(2);
      expect(ProjectModel.getOne).toBeCalledWith(3);
      expect(ProjectModel.getOne).toBeCalledTimes(count);
      expect(data.getData).toBeCalledTimes(count);
      expect(WidgetModel.getOne).toBeCalledTimes(0);
      expect(createBlobMock).toBeCalledWith(data.getData().data);
      expect(createBlobMock).toBeCalledTimes(count);
      expect(fileMock).toBeCalledTimes(count);
      expect(generateAsyncMock).toBeCalledWith({ type: 'blob' });
      expect(createLinkMock).toBeCalledWith('projects.zip', 'zipped');
      expect(result).toEqual({ ...data });
    });

    it('ContentType is "widget"', async () => {
      const count = Object.keys(store.selected).length;
      store.contentType = 'widget';

      const result = await store.downloadSelected();

      expect(WidgetModel.getOne).toBeCalledWith(1);
      expect(WidgetModel.getOne).toBeCalledWith(2);
      expect(WidgetModel.getOne).toBeCalledWith(3);
      expect(WidgetModel.getOne).toBeCalledTimes(count);
      expect(data.getData).toBeCalledTimes(count);
      expect(ProjectModel.getOne).toBeCalledTimes(0);
      expect(createBlobMock).toBeCalledTimes(count);
      expect(fileMock).toBeCalledTimes(count);
      expect(generateAsyncMock).toBeCalledWith({ type: 'blob' });
      expect(createLinkMock).toBeCalledWith('projects.zip', 'zipped');
      expect(result).toEqual({ ...data });
    });
  });
});
