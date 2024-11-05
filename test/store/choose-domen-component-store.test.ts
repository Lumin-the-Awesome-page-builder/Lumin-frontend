import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useChooseDomenStore } from '@/store/modals/choose-domen-component.store.ts';

describe('useChooseDomenStore', () => {
  let chooseDomenStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    chooseDomenStore = useChooseDomenStore();
  });

  it('initializes with default state', () => {
    expect(chooseDomenStore.showModal).toBe(false);
    expect(chooseDomenStore.domen).toBe('');
  });

  it('opens modal', () => {
    chooseDomenStore.openModal();
    expect(chooseDomenStore.showModal).toBe(true);
  });

  it('closes modal', () => {
    chooseDomenStore.openModal();
    chooseDomenStore.closeModal();
    expect(chooseDomenStore.showModal).toBe(false);
  });

  it('sets domen correctly', () => {
    chooseDomenStore.setDomen('my-subdomain');
    expect(chooseDomenStore.domen).toBe('my-subdomain');
  });
});
