import { describe, expect, it } from 'vitest';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';

describe('Align Items prop test', () => {
  it('Correct class creation', () => {
    const alignItemsProp = new AlignItemsProp('value');

    expect(alignItemsProp.value).toBe('value');
    expect(alignItemsProp.defaultValue).toBe('start');
    expect(alignItemsProp.description).toBe('___');
    expect(alignItemsProp.title).toBe('___');
    expect(alignItemsProp.values).toStrictEqual({
      start: 'align-items-start',
      end: 'align-items-end',
      center: 'align-items-center',
      between: 'align-items-baseline',
      around: 'align-items-stretch',
    });
    expect(AlignItemsProp.name).toBe('align-items');
  });

  it('Correct name getter', () => {
    const alignItemsProp = new AlignItemsProp('value');

    expect(alignItemsProp.getName()).toBe('align-items');
  });
});
