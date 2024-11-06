import { describe, expect, it } from 'vitest';
import Pure from '@/editor/components/Pure.ts';

describe('Test container component', () => {
  it('Test component creation', () => {
    const pure = new Pure();
    expect(pure.name).toBe('pure');
  });
});
