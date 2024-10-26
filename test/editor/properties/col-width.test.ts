import { describe, expect, it } from 'vitest';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';

describe('Col width prop test', () => {
  it('Correct class creation', () => {
    const justifyContentProp = new ColWidthProp('value');

    expect(justifyContentProp.value).toBe('value');
    expect(justifyContentProp.defaultValue).toBe('col');
    expect(justifyContentProp.description).toBe('___');
    expect(justifyContentProp.title).toBe('___');
    expect(justifyContentProp.values).toStrictEqual({
      c1: 'col-1',
      c2: 'col-2',
      c3: 'col-3',
      c4: 'col-4',
      c5: 'col-5',
      c6: 'col-6',
      c7: 'col-7',
      c8: 'col-8',
      c9: 'col-9',
      c10: 'col-10',
      c11: 'col-11',
      c12: 'col-12',
    });
    expect(ColWidthProp.name).toBe('col');
  });

  it('Correct name getter', () => {
    const alignSelfProp = new ColWidthProp('value');

    expect(alignSelfProp.getName()).toBe('col');
  });
});
