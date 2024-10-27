import { describe, expect, it } from 'vitest';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';

describe('Text transform prop test', () => {
  it('Correct class creation', () => {
    const textTransformProp = new TextTransformProp('value');

    expect(textTransformProp.value).toBe('value');
    expect(textTransformProp.defaultValue).toBe('text-capitalize');
    expect(textTransformProp.description).toBe('___');
    expect(textTransformProp.title).toBe('___');
    expect(textTransformProp.availableValues).toStrictEqual({
      lowercase: 'text-lowercase',
      uppercase: 'text-uppercase',
      capitalize: 'text-capitalize',
    });
    expect(TextTransformProp.name).toBe('text-transform');
  });

  it('Correct name getter', () => {
    const textTransformProp = new TextTransformProp('value');

    expect(textTransformProp.getName()).toBe('text-transform');
  });
});
