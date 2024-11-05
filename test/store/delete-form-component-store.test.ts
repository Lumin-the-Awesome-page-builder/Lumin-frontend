import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from '@/store/modals/delete-form-component.store.ts';

describe('useProjectStore', () => {
  let projectStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    projectStore = useProjectStore();
  });

  it('initializes with default state', () => {
    expect(projectStore.projectName).toBe('Название проекта');
    expect(projectStore.showModal).toBe(false);
  });

  it('returns project name via getter', () => {
    expect(projectStore.getProjectName).toBe('Название проекта');
  });

  it('opens modal and sets project name', () => {
    projectStore.openModal('Новый проект');
    expect(projectStore.showModal).toBe(true);
    expect(projectStore.projectName).toBe('Новый проект');
  });

  it('closes modal', () => {
    projectStore.openModal('Новый проект'); // Сначала откроем модал
    projectStore.closeModal();
    expect(projectStore.showModal).toBe(false);
  });
});
