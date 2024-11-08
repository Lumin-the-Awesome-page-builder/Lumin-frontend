import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import useChangeDataStore from '@/store/modals/change-data-project-component.store.ts';

describe('useChangeDataStore', () => {
  let changeDataStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    changeDataStore = useChangeDataStore();
  });

  it('initializes with default state', () => {
    expect(changeDataStore.showModal).toBe(false);
    expect(changeDataStore.projectName).toBe('');
    expect(changeDataStore.category).toBe('');
    expect(changeDataStore.tags).toBe('');
  });

  it('opens modal', () => {
    changeDataStore.openModal({
      id: 1,
      name: 'test',
      category: 'category',
      tags: 'tags',
    });
    expect(changeDataStore.showModal).toBe(true);
  });

  it('closes modal', () => {
    changeDataStore.openModal({
      id: 1,
      name: 'test',
      category: 'category',
      tags: 'tags',
    });
    changeDataStore.closeModal();
    expect(changeDataStore.showModal).toBe(false);
  });

  it('sets project name', () => {
    changeDataStore.setProjectName('New Project');
    expect(changeDataStore.projectName).toBe('New Project');
  });

  it('sets category', () => {
    changeDataStore.setCategory('New Category');
    expect(changeDataStore.category).toBe('New Category');
  });

  it('sets tags', () => {
    changeDataStore.setTags('tag1, tag2');
    expect(changeDataStore.tags).toBe('tag1, tag2');
  });
});
