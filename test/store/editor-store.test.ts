import { describe, vi, it, beforeEach, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useEditorStore from '@/store/editor.store.ts';

const getOneResult = {
  getData: vi.fn(() => 'project'),
};
const createResult = {
  getData: vi.fn(() => ({ id: 111 })),
};

vi.mock('@/api/modules/project/models/project.model.ts', () => {
  return {
    default: {
      getOne: vi.fn(() => getOneResult),
      update: vi.fn(() => 'updated'),
      create: vi.fn(() => createResult),
      startEditing: vi.fn(() => ({
        success: true,
        getData: () => ({
          project: {
            id: 123,
            data: null,
          },
          tree: 'tree',
        }),
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

  it('Test init', async () => {
    const store = useEditorStore();
    store.use = vi.fn();
    const setItemMock = vi.fn();
    vi.stubGlobal('localStorage', {
      setItem: setItemMock,
    });
    const ProjectModel = (
      await import('@/api/modules/project/models/project.model.ts')
    ).default;
    const mockedProject = await ProjectModel.startEditing(123);

    await store.init(123);

    expect(ProjectModel.startEditing).toBeCalledWith(123);
    expect(store.use).toBeCalledWith({
      ...mockedProject.getData().project,
      data: mockedProject.getData().tree,
    });
    expect(setItemMock).toBeCalledWith('selected-project', '123');
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

  it('Test set ws', () => {
    const store = useEditorStore();
    store.ws = '';

    store.setWs('test');

    expect(store.ws).toBe('test');
  });

  it('Test save', async () => {
    const store = useEditorStore();
    store.ws = {
      save: vi.fn(() => 'res'),
    };
    const result = await store.save();

    expect(store.ws.save).toBeCalledTimes(1);
    expect(result).equal('res');
  });

  it('Test pick block', () => {
    const store = useEditorStore();
    store.blockOnCreate = null;

    const div = document.createElement('div');
    div.id = 'picked';
    div.classList.add('picked-up-block');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const preview = document.createElement('img');
    preview.classList.add('overlay-img');
    preview.src = 'obj';
    overlay.appendChild(preview);

    const span = document.createElement('span');
    span.innerText = this.title;

    div.appendChild(overlay);
    div.appendChild(span);

    store.pickBlock({ component: '123', icon: 'obj' });

    expect(store.blockOnCreate).toEqual({ component: '123', icon: div });
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
    expect(store.blockOnCreate).toEqual({
      component: null,
      icon: null,
      widget: false,
    });
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

    expect(addMock).toBeCalledWith('test', 'parent', null);
    expect(store.clearBlockSelection).toBeCalled();
  });
});
