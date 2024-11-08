import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useChooseDomainStore } from '@/store/modals/choose-domen-component.store.ts';

describe('useChooseDomenStore', () => {
  let chooseDomenStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    chooseDomenStore = useChooseDomainStore();
  });

  it('initializes with default state', () => {
    expect(chooseDomenStore.showModal).toBe(false);
    expect(chooseDomenStore.domain).toBe('');
  });

  it('opens modal', () => {
    chooseDomenStore.openModal({
      id: 1,
      name: 'test',
      category: 'category',
      tags: 'tags',
    });
    expect(chooseDomenStore.showModal).toBe(true);
  });

  it('closes modal', () => {
    chooseDomenStore.openModal({
      id: 1,
      name: 'test',
      category: 'category',
      tags: 'tags',
    });
    chooseDomenStore.closeModal();
    expect(chooseDomenStore.showModal).toBe(false);
  });

  it('sets domen correctly', () => {
    chooseDomenStore.setDomain('my-subdomain');
    expect(chooseDomenStore.domain).toBe('my-subdomain');
  });
});
