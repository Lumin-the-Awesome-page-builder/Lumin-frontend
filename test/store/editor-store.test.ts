import { describe, vi, it, beforeEach, expect } from 'vitest';
import ProjectModel from '@/api/modules/project/models/project.model.ts';
import { createPinia, setActivePinia } from 'pinia';
import useEditorStore from '@/store/editor.store.ts';

vi.mock('@/api/modules/project/models/project.model.ts', () => {
  return {
    default: {
      getOne: vi.fn(() => ({
        getData: vi.fn(() => 'project')
      })),
      update: vi.fn(() => 'updated'),
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

    await store.useById(123);

    expect(ProjectModel.getOne).toBeCalledWith(123);
    expect(store.use).toBeCalledWith('project');
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

    await store.save();

    expect(ProjectModel.update).toBeCalledWith(123, { id: 123 });
  });
});
