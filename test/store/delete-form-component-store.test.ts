import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import useDeleteProjectModalStore from '@/store/modals/delete-form-component.store.ts';

describe('useProjectStore', () => {
  let projectStore;

  beforeEach(async () => {
    setActivePinia(createPinia());
    projectStore = await useDeleteProjectModalStore();
  });

  it('initializes with default state', () => {
    expect(projectStore.project.name).toBe('Название проекта');
    expect(projectStore.showModal).toBe(false);
  });

  it('returns project name via getter', () => {
    expect(projectStore.getProjectName).toBe('Название проекта');
  });

  it('opens modal and sets project name', () => {
    projectStore.openModal('Новый проект');
    expect(projectStore.showModal).toBe(true);
    expect(projectStore.project).toBe('Новый проект');
  });

  it('closes modal', () => {
    projectStore.openModal('Новый проект'); // Сначала откроем модал
    projectStore.closeModal();
    expect(projectStore.showModal).toBe(false);
  });
});
