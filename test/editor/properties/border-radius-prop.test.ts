import { describe, expect, it } from 'vitest';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';

describe('Border Radius prop test', () => {
  it('Correct class creation', () => {
    const borderRadiusProp = new BorderRadiusProp('value');

    expect(borderRadiusProp.value).toBe('value');
    expect(borderRadiusProp.defaultValue).toBe('r0');
    expect(borderRadiusProp.description).toBe('___');
    expect(borderRadiusProp.title).toBe('___');
    expect(borderRadiusProp.availableValues).toStrictEqual({
      r0: 'rounded-0',
      r1: 'rounded-1',
      r2: 'rounded-2',
      r3: 'rounded-3',
      r4: 'rounded-4',
      r5: 'rounded-5',
    });
    expect(BorderRadiusProp.name).toBe('border-radius');
  });

  it('Correct name getter', () => {
    const borderRadiusProp = new BorderRadiusProp('value');

    expect(borderRadiusProp.getName()).toBe('border-radius');
  });
});
