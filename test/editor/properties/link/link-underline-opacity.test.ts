import { describe, expect, it } from 'vitest';
import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';

describe('Link Underline Opacity prop test', () => {
  it('Correct class creation', () => {
    const linkUnderlineOpacity = new LinkUnderlineOpacityProp('value');

    expect(linkUnderlineOpacity.value).toBe('value');
    expect(linkUnderlineOpacity.defaultValue).toBe('opacity100');
    expect(linkUnderlineOpacity.description).toBe('___');
    expect(linkUnderlineOpacity.title).toBe('___');
    expect(linkUnderlineOpacity.availableValues).toStrictEqual({
      opacity0: 'link-underline-opacity-0',
      opacity10: 'link-underline-opacity-10',
      opacity25: 'link-underline-opacity-25',
      opacity50: 'link-underline-opacity-50',
      opacity75: 'link-underline-opacity-75',
      opacity100: 'link-underline-opacity-100',
    });
    expect(LinkUnderlineOpacityProp.name).toBe('link-underline-opacity');
  });

  it('Correct name getter', () => {
    const linkUnderlineOpacity = new LinkUnderlineOpacityProp('value');

    expect(linkUnderlineOpacity.getName()).toBe('link-underline-opacity');
  });
});
