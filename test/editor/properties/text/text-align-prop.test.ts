import { describe, expect, it } from 'vitest';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';

describe('Text Align prop test', () => {
  it('Correct class creation', () => {
    const textAlignProp = new TextAlignProp('value');

    expect(textAlignProp.value).toBe('value');
    expect(textAlignProp.defaultValue).toStrictEqual(['start']);
    expect(textAlignProp.availableValues).toStrictEqual([
      {
        start: 'text-start',
        center: 'text-center',
        end: 'text-end',
      },
    ]);
    expect(TextAlignProp.name).toBe('text-align');
  });

  it('Correct name getter', () => {
    const textAlignProp = new TextAlignProp('value');

    expect(textAlignProp.getName()).toBe('text-align');
  });
});
