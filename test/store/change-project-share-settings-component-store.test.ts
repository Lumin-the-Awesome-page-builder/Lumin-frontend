import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useChangeProjectSharingSettingsStore from '@/store/modals/change-project-share-settings-component.store.ts';

vi.mock('@/api/modules/project/models/project.model.ts', () => {
  return {
    default: {
      getCollaborationToken: vi.fn(() =>
        Promise.resolve({
          success: true,
          getData: () => ({ access_token: 'test-token' }),
        }),
      ),
      patchShare: vi.fn(() => Promise.resolve({ success: true })),
    },
  };
});

describe('useChangeProjectSharingSettingsStore', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useChangeProjectSharingSettingsStore();
  });

  it('initializes with default state', () => {
    expect(store.showModal).toBe(false);
    expect(store.projectId).toBe(0);
    expect(store.collaboration).toBe(false);
    expect(store.marketplace).toBe(false);
    expect(store.collaborationLink).toBe('');
    expect(store.needFetchIfUpdate).toBe(false);
  });

  it('loads data correctly', () => {
    const data = { id: 1, shared: true, shared_marketplace: false };

    store.loadData(data);

    expect(store.projectId).toBe(1);
    expect(store.collaboration).toBe(true);
    expect(store.marketplace).toBe(false);
    expect(store.needFetchIfUpdate).toBe(false);
  });

  it('opens modal and fetches collaboration link if shared', async () => {
    const data = { id: 1, shared: true, shared_marketplace: false };

    const response = await store.openModal(data);

    expect(store.projectId).toBe(1);
    expect(store.collaboration).toBe(true);
    expect(store.marketplace).toBe(false);
    expect(store.needFetchIfUpdate).toBe(false);
    expect(store.showModal).toBe(true);
    expect(store.collaborationLink).toBe(
      'https://lumin.dudosyka.ru/project/test-token/edit',
    );
    expect(response.success).toBe(true);
  });

  it('opens modal without fetching if not shared', async () => {
    const data = { id: 1, shared: false, shared_marketplace: false };

    const response = await store.openModal(data);

    expect(store.projectId).toBe(1);
    expect(store.collaboration).toBe(false);
    expect(store.marketplace).toBe(false);
    expect(store.needFetchIfUpdate).toBe(true);
    expect(store.showModal).toBe(true);
    expect(response.success).toBe(true);
  });

  it('updates collaboration and marketplace settings', async () => {
    store.projectId = 1;
    await store.update({ collaboration: true, marketplace: true });

    expect(store.collaboration).toBe(true);
    expect(store.marketplace).toBe(true);

    // Проверяем вызов patchShare
    const ProjectModel = await import(
      '@/api/modules/project/models/project.model.ts'
    );

    expect(ProjectModel.default.patchShare).toHaveBeenCalledWith(1, {
      collaboration: true,
      marketplace: true,
    });
  });

  it('fetches collaboration link after update if needed', async () => {
    store.projectId = 1;
    store.needFetchIfUpdate = true;

    await store.update({ collaboration: true, marketplace: false });

    const ProjectModel = await import(
      '@/api/modules/project/models/project.model.ts'
    );

    expect(ProjectModel.default.getCollaborationToken).toHaveBeenCalledWith(1);
  });

  it('closes modal correctly', () => {
    store.closeModal();

    expect(store.showModal).toBe(false);
  });
});
