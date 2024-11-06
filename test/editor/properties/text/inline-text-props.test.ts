import { describe, expect, it } from 'vitest';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';

describe('Inline text props test', () => {
  it('Correct class creation', () => {
    const itProps = new InlineTextProp('value');

    expect(itProps.value).toStrictEqual('value');
    expect(itProps.defaultValue).toStrictEqual([null, null]);
    expect(itProps.availableValues).toStrictEqual([
      {
        checked: 'mark',
      },
      {
        checked: 'small',
      },
    ]);
  });
  it('Correct name getter', () => {
    const itProps = new InlineTextProp(['mark', 'small']);
    expect(itProps.getName()).toBe('inline-text');
  });
});
