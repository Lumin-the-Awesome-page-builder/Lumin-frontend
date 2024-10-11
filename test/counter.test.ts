import { describe, beforeEach, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useCounterStore from '@/stores/counter';

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('increments', () => {
    const counter = useCounterStore();
    expect(counter.doubleCount).toBe(0);
    counter.increment();
    expect(counter.doubleCount).toBe(2);
  });

  it('increments by amount', () => {
    const counter = useCounterStore();
    counter.increment(10);
    expect(counter.doubleCount).toBe(20);
  });
});
