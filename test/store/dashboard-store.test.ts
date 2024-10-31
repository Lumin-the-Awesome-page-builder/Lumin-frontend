import { beforeEach, describe, vi, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useDashboardStore from '@/store/dashboard.store.ts';
import LibraryModel from '@/api/modules/library/models/library.model.ts';

vi.mock('@/api/modules/library/models/library.model.ts', () => {
  return {
    default: {
      getProjects: vi.fn(() => ({
        success: true,
        getData: vi.fn(() => 'projects'),
      })),
      getWidgets: vi.fn(() => ({
        success: true,
        getData: vi.fn(() => 'widgets'),
      })),
    },
  };
});

describe('Dashboard store tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test load projects', async () => {
    const store = useDashboardStore();

    await store.loadProjects();

    expect(LibraryModel.getProjects).toBeCalled();
    expect(store.data).toBe('projects');
    expect(store.contentType).toBe('project');
  });

  it('Test load widgets', async () => {
    const store = useDashboardStore();

    await store.loadWidgets();

    expect(LibraryModel.getWidgets).toBeCalled();
    expect(store.data).toBe('widgets');
    expect(store.contentType).toBe('widget');
  });

  describe('Test toggle selected', () => {
    it('Test remove', () => {
      const store = useDashboardStore();

      store.selected = { 123: true };

      store.toggleSelected(123);

      expect(store.selected).toStrictEqual({});
    });

    it('Test select', () => {
      const store = useDashboardStore();

      store.selected = {};

      store.toggleSelected(123);

      expect(store.selected).toStrictEqual({ 123: true });
    });
  });

  describe('Test getters', () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });

    const item = { created_at: 123 };
    const contentType = 'project';
    const selected = { 123: true };

    it('Test data getter', () => {
      const store = useDashboardStore();
      store.data = [item];

      const result = store.getData;

      expect(result).toStrictEqual([
        {
          ...item,
          date: new Date(item.created_at),
          imageSrc: '../src/assets/imageCard/screenshot.png',
        },
      ]);
    });

    it('Test type getter', () => {
      const store = useDashboardStore();
      store.contentType = contentType;

      const result = store.getType;

      expect(result).toBe(contentType);
    });

    it('Test selected getter', () => {
      const store = useDashboardStore();
      store.selected = selected;

      const result = store.getSelected;

      expect(result).toStrictEqual(selected);
    });
  });
});
