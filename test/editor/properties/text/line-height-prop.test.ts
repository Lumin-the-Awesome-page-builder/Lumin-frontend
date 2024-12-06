import { describe, expect, it } from 'vitest';
import LineHeightProp from '@/editor/properties/text/LineHeightProp.ts';

describe('Line Height prop test', () => {
  it('Correct class creation', () => {
    const lineHeightProp = new LineHeightProp('value');

    expect(lineHeightProp.value).toBe('value');
    expect(lineHeightProp.defaultValue).toStrictEqual([66]);
    expect(lineHeightProp.availableValues).toStrictEqual([
      {
        0: 'lh-1',
        33: 'lh-sm',
        66: 'lh-base',
        100: 'lh-lg',
      },
    ]);
    expect(LineHeightProp.name).toBe('line-height');
  });

  it('Correct name getter', () => {
    const leadParagraphProp = new LineHeightProp('value');

    expect(leadParagraphProp.getName()).toBe('line-height');
  });
});
