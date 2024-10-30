import { describe, expect, it } from 'vitest';
import LineHeightProp from '@/editor/properties/text/LineHeightProp.ts';

describe('Line Height prop test', () => {
  it('Correct class creation', () => {
    const lineHeightProp = new LineHeightProp('value');

    expect(lineHeightProp.value).toBe('value');
    expect(lineHeightProp.defaultValue).toBe('base');
    expect(lineHeightProp.description).toBe('___');
    expect(lineHeightProp.title).toBe('___');
    expect(lineHeightProp.availableValues).toStrictEqual({
      one: 'lh-1',
      small: 'lh-sm',
      base: 'lh-base',
      large: 'lh-lg',
    });
    expect(LineHeightProp.name).toBe('lh');
  });

  it('Correct name getter', () => {
    const leadParagraphProp = new LineHeightProp('value');

    expect(leadParagraphProp.getName()).toBe('lh');
  });
});
