import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import useHelloFormStore from '@/store/modals/hello-form-component.store.ts';

describe('useHelloFormStore', () => {
  let helloFormStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    helloFormStore = useHelloFormStore();
  });

  it('initializes with default state', () => {
    expect(helloFormStore.showModal).toBe(false);
  });

  it('opens modal', () => {
    helloFormStore.openModal();
    expect(helloFormStore.showModal).toBe(true);
  });

  it('closes modal', () => {
    helloFormStore.openModal();
    helloFormStore.closeModal();
    expect(helloFormStore.showModal).toBe(false);
  });
});
