import { describe, expect, it } from 'vitest';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';

describe('Border Radius prop test', () => {
  it('Correct class creation', () => {
    const borderRadiusProp = new BorderRadiusProp('value');

    expect(borderRadiusProp.value).toBe('value');
    expect(borderRadiusProp.defaultValue).toStrictEqual([0]);
    expect(borderRadiusProp.availableValues).toStrictEqual([
      {
        0: 'rounded-0',
        20: 'rounded-1',
        40: 'rounded-2',
        60: 'rounded-3',
        80: 'rounded-4',
        100: 'rounded-5',
      },
    ]);
    expect(BorderRadiusProp.name).toBe('border-radius');
  });

  it('Correct name getter', () => {
    const borderRadiusProp = new BorderRadiusProp('value');

    expect(borderRadiusProp.getName()).toBe('border-radius');
  });
});
