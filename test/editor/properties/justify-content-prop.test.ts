import { describe, expect, it } from 'vitest';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';

describe('Justify-content prop test', () => {
  it('Correct class creation', () => {
    const justifyContentProp = new JustifyContentProp('value');

    expect(justifyContentProp.value).toBe('value');
    expect(justifyContentProp.defaultValue).toStrictEqual(['start']);
    expect(justifyContentProp.availableValues).toStrictEqual([
      {
        center: 'justify-content-center',
        end: 'justify-content-end',
        start: 'justify-content-start',
        around: 'justify-content-around',
        between: 'justify-content-between',
        evenly: 'justify-content-evenly',
      },
    ]);
    expect(JustifyContentProp.name).toBe('justify-content');
  });

  it('Correct name getter', () => {
    const alignSelfProp = new JustifyContentProp('value');

    expect(alignSelfProp.getName()).toBe('justify-content');
  });
});
