import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import usePreviewModalStore from '@/store/project-preview-modal.store.ts';

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

  it('should open modal and set data', () => {
    const store = usePreviewModalStore();
    const inputData = {
      id: 2,
      name: 'New project',
      date: Date.now(),
      stars: 20,
    };

    store.openModal(inputData);

    expect(store.isOpen).toBe(true);
    expect(store.data).toEqual(inputData);
  });

  it('should close modal and reset data', () => {
    const store = usePreviewModalStore();

    store.openModal({
      id: 2,
      name: 'New project',
      date: Date.now(),
      stars: 20,
    });

    store.closeModal();

    expect(store.isOpen).toBe(false);
    expect(store.data).toEqual({});
  });

  it('should return correct status from getter', () => {
    const store = usePreviewModalStore();

    expect(store.getStatus).toBe(false);

    store.openModal({
      id: 2,
      name: 'New project',
      date: Date.now(),
      stars: 20,
    });

    expect(store.getStatus).toBe(true);
  });

  it('should return correct data from getter', () => {
    const store = usePreviewModalStore();

    expect(store.getData).toEqual({
      id: 1,
      name: 'Test project',
      date: expect.any(Number),
      stars: 14,
    });

    const inputData = {
      id: 2,
      name: 'New project',
      date: Date.now(),
      stars: 20,
    };
    store.openModal(inputData);

    expect(store.getData).toEqual(inputData);
  });
});
