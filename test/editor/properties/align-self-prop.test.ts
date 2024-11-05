import { describe, expect, it } from 'vitest';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';

describe('Align Self prop test', () => {
  it('Correct class creation', () => {
    const alignSelfProp = new AlignContentProp('value');

    expect(alignSelfProp.value).toBe('value');
    expect(alignSelfProp.defaultValue).toBe('start');
    expect(alignSelfProp.description).toBe('___');
    expect(alignSelfProp.title).toBe('___');
    expect(alignSelfProp.availableValues).toStrictEqual({
      start: 'align-self-start',
      end: 'align-self-end',
      center: 'align-self-center',
      between: 'align-self-baseline',
      around: 'align-self-stretch',
    });
    expect(AlignContentProp.name).toBe('align-self');
  });

  it('Correct name getter', () => {
    const alignSelfProp = new AlignContentProp('value');

    expect(alignSelfProp.getName()).toBe('align-self');
  });
});
