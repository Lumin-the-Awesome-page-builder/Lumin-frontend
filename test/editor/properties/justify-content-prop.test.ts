import { describe, expect, it } from 'vitest';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';

describe('Justify-content prop test', () => {
  it('Correct class creation', () => {
    const justifyContentProp = new JustifyContentProp('value');

    expect(justifyContentProp.value).toBe('value');
    expect(justifyContentProp.defaultValue).toBe('start');
    expect(justifyContentProp.description).toBe('___');
    expect(justifyContentProp.title).toBe('___');
    expect(justifyContentProp.availableValues).toStrictEqual({
      start: 'justify-content-start',
      end: 'justify-content-end',
      center: 'justify-content-center',
      between: 'justify-content-between',
      around: 'justify-content-around',
      evenly: 'justify-content-evenly',
    });
    expect(JustifyContentProp.name).toBe('justify-content');
  });

  it('Correct name getter', () => {
    const alignSelfProp = new JustifyContentProp('value');

    expect(alignSelfProp.getName()).toBe('justify-content');
  });
});
