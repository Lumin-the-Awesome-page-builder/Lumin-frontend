import { describe, vi, it, beforeEach, expect } from 'vitest';
import ProjectModel from '@/api/modules/project/models/project.model.ts';
import { createPinia, setActivePinia } from 'pinia';
import useEditorStore from '@/store/editor.store.ts';

vi.mock('@/api/modules/project/models/project.model.ts', () => {
  return {
    default: {
      getOne: vi.fn(() => ({
        getData: vi.fn(() => 'project'),
      })),
      update: vi.fn(() => 'updated'),
      create: vi.fn(() => ({
        getData: () => ({ id: 111 }),
      })),
    },
  };
});

vi.mock('@/utils/token.util.ts', () => {
  return {
    default: {
      getAuthorized: () => ({ id: 112 }),
    },
  };
});

describe('EditorStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test use by id', async () => {
    const store = useEditorStore();
    store.use = vi.fn();
    const setItemMock = vi.fn();
    vi.stubGlobal('localStorage', {
      setItem: setItemMock,
    });

    await store.useById(123);

    expect(ProjectModel.getOne).toBeCalledWith(123);
    expect(store.use).toBeCalledWith('project');
    expect(setItemMock).toBeCalledWith('selected-project', '123');
  });

  it('Test open new', async () => {
    const store = useEditorStore();
    store.save = vi.fn();
    const setItemMock = vi.fn();
    vi.stubGlobal('localStorage', {
      setItem: setItemMock,
    });
    const stringifyMock = vi.fn(() => 'data');
    vi.stubGlobal('JSON', {
      stringify: stringifyMock,
    });

    const res = await store.openNew();

    expect(setItemMock).toBeCalledWith('selected-project', 111);
    expect(store.save).toBeCalled();
    expect(stringifyMock).toBeCalled();
    expect(res).toEqual({
      id: 111,
      data: 'data',
    });
  });

  it('Test use', () => {
    const store = useEditorStore();
    store.selected = '';

    store.use('test');

    expect(store.selected).toBe('test');
  });

  it('Test set app', () => {
    const store = useEditorStore();
    store.app = '';

    store.setApp('test');

    expect(store.app).toBe('test');
  });

  it('Test save', async () => {
    const store = useEditorStore();
    store.selected = {
      id: 123,
    };

    await store.save('data');

    expect(ProjectModel.update).toBeCalledWith(123, 'data');
  });

  it('Test pick block', () => {
    const store = useEditorStore();
    store.blockOnCreate = null;

    store.pickBlock({ component: '123', icon: 'obj' });

    expect(store.blockOnCreate).toEqual({ component: '123', icon: 'obj' });
  });

  it('test clear block selection', () => {
    const store = useEditorStore();
    const removeMock = vi.fn();
    store.blockOnCreate = {
      component: 'test',
      icon: {
        remove: removeMock,
      },
    };

    store.clearBlockSelection();

    expect(removeMock).toBeCalled();
    expect(store.blockOnCreate).toEqual({ component: null, icon: null });
  });

  it('place block', () => {
    const store = useEditorStore();
    store.blockOnCreate = {
      component: 'test',
      icon: true,
    };
    const addMock = vi.fn();
    store.app = {
      add: addMock,
    };
    store.clearBlockSelection = vi.fn();

    store.placeBlock('parent');

    expect(addMock).toBeCalledWith('test', '', 'parent');
    expect(store.clearBlockSelection).toBeCalled();
  });
});
