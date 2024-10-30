import { describe, expect, it } from 'vitest';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';

describe('Link Underline Offset prop test', () => {
  it('Correct class creation', () => {
    const linkUnderlineOffsetProp = new LinkUnderlineOffsetProp('value');

    expect(linkUnderlineOffsetProp.value).toBe('value');
    expect(linkUnderlineOffsetProp.defaultValue).toBe('link-offset-1');
    expect(linkUnderlineOffsetProp.description).toBe('___');
    expect(linkUnderlineOffsetProp.title).toBe('___');
    expect(linkUnderlineOffsetProp.availableValues).toStrictEqual({
      one: 'link-offset-1',
      two: 'link-offset-2',
      three: 'link-offset-3',
    });
    expect(LinkUnderlineOffsetProp.name).toBe('link-offset');
  });

  it('Correct name getter', () => {
    const linkUnderlineOffsetProp = new LinkUnderlineOffsetProp('value');

    expect(linkUnderlineOffsetProp.getName()).toBe('link-offset');
  });
});
