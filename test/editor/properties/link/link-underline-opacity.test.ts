import { describe, expect, it } from 'vitest';
import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';

describe('Link Underline Opacity prop test', () => {
  it('Correct class creation', () => {
    const linkUnderlineOpacity = new LinkUnderlineOpacityProp('value');

    expect(linkUnderlineOpacity.value).toBe('value');
    expect(linkUnderlineOpacity.defaultValue).toStrictEqual([null, null]);
    expect(linkUnderlineOpacity.availableValues).toStrictEqual([
      {
        0: 'link-underline-opacity-0',
        10: 'link-underline-opacity-10',
        25: 'link-underline-opacity-25',
        50: 'link-underline-opacity-50',
        75: 'link-underline-opacity-75',
        100: 'link-underline-opacity-100',
      },
      {
        0: 'link-underline-opacity-0-hover',
        10: 'link-underline-opacity-10-hover',
        25: 'link-underline-opacity-25-hover',
        50: 'link-underline-opacity-50-hover',
        75: 'link-underline-opacity-75-hover',
        100: 'link-underline-opacity-100-hover',
      },
    ]);
    expect(LinkUnderlineOpacityProp.name).toBe('link-underline-opacity');
  });

  it('Correct name getter', () => {
    const linkUnderlineOpacity = new LinkUnderlineOpacityProp('value');

    expect(linkUnderlineOpacity.getName()).toBe('link-underline-opacity');
  });
});
