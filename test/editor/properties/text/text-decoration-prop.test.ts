import { describe, expect, it } from 'vitest';
import TextDecorationProp from '@/editor/properties/text/TextDecorationProp.ts';

describe('Text transform prop test', () => {
  it('Correct class creation', () => {
    const textDecorationProp = new TextDecorationProp('value');

    expect(textDecorationProp.value).toBe('value');
    expect(textDecorationProp.defaultValue).toStrictEqual([null]);
    expect(textDecorationProp.availableValues).toStrictEqual([
      {
        none: 'text-decoration-none',
        line_through: 'text-decoration-line-through',
        underline: 'text-decoration-underline',
      },
    ]);
    expect(TextDecorationProp.name).toBe('text-decoration');
  });

  it('Correct name getter', () => {
    const textDecorationProp = new TextDecorationProp('value');

    expect(textDecorationProp.getName()).toBe('text-decoration');
  });
});
