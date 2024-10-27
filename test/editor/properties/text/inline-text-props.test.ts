import { describe, expect, it } from 'vitest';
import InlineTextProps from '@/editor/properties/text/InlineTextProps.ts';

describe('Inline text props test', () => {
  it('Correct class creation', () => {
    const itProps = new InlineTextProps(['mark', 'small']);

    expect(itProps.values).toStrictEqual(['mark', 'small']);
    expect(itProps.defaultValue).toBe('empty');
    expect(itProps.description).toBe('___');
    expect(itProps.title).toBe('___');
    expect(itProps.availableValues).toStrictEqual({
      empty: '',
      mark: 'mark',
      small: 'small',
      textDecorationUnderline: 'text-decoration-underline',
      textDecorationLineThrough: 'text-decoration-line-through',
      textDecorationNone: 'text-decoration-none',
    });
    expect(InlineTextProps.name).toBe('inline-text');
  });

  it('Correct name getter', () => {
    const itProps = new InlineTextProps(['mark', 'small']);
    expect(itProps.getName()).toBe('inline-text');
  });
});