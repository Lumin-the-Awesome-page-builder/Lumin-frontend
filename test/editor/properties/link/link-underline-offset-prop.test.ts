import { describe, expect, it } from 'vitest';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';

describe('Link Underline Offset prop test', () => {
  it('Correct class creation', () => {
    const linkUnderlineOffsetProp = new LinkUnderlineOffsetProp('value');

    expect(linkUnderlineOffsetProp.value).toBe('value');
    expect(linkUnderlineOffsetProp.defaultValue).toStrictEqual([null]);
    expect(linkUnderlineOffsetProp.availableValues).toStrictEqual([
      {
        0: 'link-offset-0',
        33: 'link-offset-1',
        66: 'link-offset-2',
        100: 'link-offset-3',
      },
    ]);
    expect(LinkUnderlineOffsetProp.name).toBe('link-offset');
  });

  it('Correct name getter', () => {
    const linkUnderlineOffsetProp = new LinkUnderlineOffsetProp('value');

    expect(linkUnderlineOffsetProp.getName()).toBe('link-offset');
  });
});
