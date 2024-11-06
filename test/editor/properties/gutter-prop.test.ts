import { describe, expect, it } from 'vitest';
import GutterProp from '@/editor/properties/GutterProp.ts';

describe('Gutter prop test', () => {
  it('Correct class creation', () => {
    const fdProp = new GutterProp('value');

    expect(fdProp.value).toBe('value');
    expect(fdProp.defaultValue).toStrictEqual([0]);
    expect(fdProp.availableValues).toStrictEqual([
      {
        0: 'gap-0',
        20: 'gap-1',
        40: 'gap-2',
        60: 'gap-3',
        80: 'gap-4',
        100: 'gap-5',
      },
    ]);
    expect(GutterProp.name).toBe('gap');
  });

  it('Correct name getter', () => {
    const fdProp = new GutterProp('value');

    expect(fdProp.getName()).toBe('gap');
  });
});
