import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useConfirmationStore } from '@/store/confirmation-form-component.store.ts';

describe('useConfirmationStore', () => {
  let confirmationStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    confirmationStore = useConfirmationStore();
  });

  it('initializes with default state', () => {
    expect(confirmationStore.showModal).toBe(false);
  });

  it('opens modal', () => {
    confirmationStore.openModal();
    expect(confirmationStore.showModal).toBe(true);
  });

  it('closes modal', () => {
    confirmationStore.openModal();
    confirmationStore.closeModal();
    expect(confirmationStore.showModal).toBe(false);
  });
});
