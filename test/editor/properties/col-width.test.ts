import { describe, expect, it } from 'vitest';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';

describe('Col width prop test', () => {
  it('Correct class creation', () => {
    const justifyContentProp = new ColWidthProp('value');

    expect(justifyContentProp.value).toBe('value');
    expect(justifyContentProp.defaultValue).toStrictEqual([0]);
    expect(justifyContentProp.availableValues).toStrictEqual([
      {
        0: 'col',
        8: 'col-1',
        16: 'col-2',
        25: 'col-3',
        33: 'col-4',
        41: 'col-5',
        50: 'col-6',
        58: 'col-7',
        66: 'col-8',
        75: 'col-9',
        83: 'col-10',
        91: 'col-11',
        100: 'col-12',
      },
    ]);
    expect(ColWidthProp.name).toBe('col');
  });

  it('Correct name getter', () => {
    const alignSelfProp = new ColWidthProp('value');

    expect(alignSelfProp.getName()).toBe('col');
  });
});
