import { describe, expect, it } from 'vitest';
import AlignSelfProp from '@/editor/properties/AlignSelfProp.ts';

describe('Align Self prop test', () => {
  it('Correct class creation', () => {
    const alignSelfProp = new AlignSelfProp('value');

    expect(alignSelfProp.value).toBe('value');
    expect(alignSelfProp.defaultValue).toBe('start');
    expect(alignSelfProp.description).toBe('___');
    expect(alignSelfProp.title).toBe('___');
    expect(alignSelfProp.values).toStrictEqual({
      start: 'align-self-start',
      end: 'align-self-end',
      center: 'align-self-center',
      between: 'align-self-baseline',
      around: 'align-self-stretch',
    });
    expect(AlignSelfProp.name).toBe('align-self');
  });

  it('Correct name getter', () => {
    const alignSelfProp = new AlignSelfProp('value');

    expect(alignSelfProp.getName()).toBe('align-self');
  });
});
