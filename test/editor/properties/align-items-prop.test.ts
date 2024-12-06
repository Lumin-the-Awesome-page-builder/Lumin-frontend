import { describe, expect, it } from 'vitest';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';

describe('Align Items prop test', () => {
  it('Correct class creation', () => {
    const alignItemsProp = new AlignItemsProp('value');

    expect(alignItemsProp.value).toBe('value');
    expect(alignItemsProp.defaultValue).toStrictEqual(['start']);
    expect(alignItemsProp.availableValues).toStrictEqual([
      {
        start: 'align-items-start',
        end: 'align-items-end',
        center: 'align-items-center',
        baseline: 'align-items-baseline',
        stretch: 'align-items-stretch',
      },
    ]);
    expect(AlignItemsProp.name).toBe('align-items');
  });

  it('Correct name getter', () => {
    const alignItemsProp = new AlignItemsProp('value');

    expect(alignItemsProp.getName()).toBe('align-items');
  });
});
