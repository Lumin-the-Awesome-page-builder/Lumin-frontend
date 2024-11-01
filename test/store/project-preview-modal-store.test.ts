import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import usePreviewModalStore from '@/store/project-preview-modal.store.ts';
import ProjectModel from '@/api/modules/project/models/project.model.ts';
import WidgetModel from '@/api/modules/widget/models/widget.model.ts';

vi.mock('@/api/modules/project/models/project.model.ts', () => ({
  default: {
    getOne: vi.fn(() => ({
      id: 1,
      name: 'Test project',
      date: Date.now(),
      stars: 14,
    })),
  },
}));

vi.mock('@/api/modules/widget/models/widget.model.ts', () => ({
  default: {
    getOne: vi.fn(() => ({
      id: 1,
      name: 'Test widget',
      date: Date.now(),
      stars: 14,
    })),
  },
}));

describe('usePreviewModalStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default state', () => {
    const store = usePreviewModalStore();
    expect(store.isOpen).toBe(false);
    expect(store.data).toEqual({
      id: 1,
      name: 'Test project',
      date: expect.any(Number),
      stars: 14,
    });
  });

  it('should open modal and set data', async () => {
    const store = usePreviewModalStore();

    await store.openModal(1, 'project');

    expect(store.isOpen).toBe(true);
    expect(ProjectModel.getOne).toBeCalledWith(1);
    expect(store.data).toEqual({
      id: 1,
      name: 'Test project',
      date: expect.any(Number),
      stars: 14,
    });
  });

  it('should open modal and set data', async () => {
    const store = usePreviewModalStore();

    await store.openModal(1, 'widget');

    expect(store.isOpen).toBe(true);
    expect(WidgetModel.getOne).toBeCalledWith(1);
    expect(store.data).toEqual({
      id: 1,
      name: 'Test project',
      date: expect.any(Number),
      stars: 14,
    });
  });

  it('should close modal and reset data', () => {
    const store = usePreviewModalStore();

    store.closeModal();

    expect(store.isOpen).toBe(false);
    expect(store.data).toEqual({});
  });

  it('should return correct status from getter', () => {
    const store = usePreviewModalStore();

    store.isOpen = false;

    expect(store.getStatus).toBe(false);
  });

  it('should return correct data from getter', () => {
    const store = usePreviewModalStore();

    expect(store.getData).toEqual({
      id: 1,
      name: 'Test project',
      date: expect.any(Number),
      stars: 14,
    });
  });
});
