import { describe, vi, it, beforeEach, expect } from 'vitest';
import ProjectModel from '@/api/modules/project/models/project.model.ts';
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

    const result = await store.useById(123);

    expect(ProjectModel.getOne).toBeCalledWith(123);
    expect(store.use).toBeCalledWith('project');
    expect(setItemMock).toBeCalledWith('selected-project', '123');
    expect(result).toEqual({ ...getOneResult });
  });

  // it('Test open new', async () => {
  //   const store = useEditorStore();
  //   store.save = vi.fn(() => 'save');
  //   const setItemMock = vi.fn();
  //   vi.stubGlobal('localStorage', {
  //     setItem: setItemMock,
  //   });
  //   const stringifyMock = vi.fn(() => 'data');
  //   vi.stubGlobal('JSON', {
  //     stringify: stringifyMock,
  //   });
  //
  //   const res = await store.openNew();
  //   expect(setItemMock).toBeCalledWith('selected-project', 111);
  //   expect(store.save).toBeCalled();
  //   expect(stringifyMock).toBeCalled();
  //   expect(res).toEqual([createResult, 'save']);
  // });

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

  describe('Test save', () => {
    let store;
    beforeEach(() => {
      store = useEditorStore();
      store.selected = {
        id: 123,
      };
    });

    it('State is not null', async () => {
      const state = 'state';
      const result = await store.save(state);

      expect(ProjectModel.update).toBeCalledWith(123, state);
      expect(result).equal('updated');
    });

    it('State is null', async () => {
      const result = await store.save();

      expect(ProjectModel.update).toBeCalledWith(123, {
        data: JSON.stringify({ setup: { rootOrdering: [] } }),
      });
      expect(result).equal('updated');
    });
  });

  it('Test pick block', () => {
    const store = useEditorStore();
    store.blockOnCreate = null;

    const div = document.createElement('div');
    div.id = 'picked';
    div.classList.add('picked-up-block');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.style = `background-image: url("${'obj'}");`;

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
