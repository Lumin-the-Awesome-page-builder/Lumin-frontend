import { describe, expect, it } from 'vitest';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';

describe('Link opacity prop test', () => {
  it('Correct class creation', () => {
    const linkOpacityProp = new LinkOpacityProp('value');

    expect(linkOpacityProp.value).toBe('value');
    expect(linkOpacityProp.defaultValue).toStrictEqual([null, null]);
    expect(linkOpacityProp.availableValues).toStrictEqual([
      {
        0: 'link-opacity-0',
        10: 'link-opacity-10',
        25: 'link-opacity-25',
        50: 'link-opacity-50',
        75: 'link-opacity-75',
        100: 'link-opacity-100',
      },
      {
        0: 'link-opacity-0-hover',
        10: 'link-opacity-10-hover',
        25: 'link-opacity-25-hover',
        50: 'link-opacity-50-hover',
        75: 'link-opacity-75-hover',
        100: 'link-opacity-100-hover',
      },
    ]);
    expect(LinkOpacityProp.name).toBe('link-opacity');
  });

  it('Correct name getter', () => {
    const linkOpacityProp = new LinkOpacityProp('value');

    expect(linkOpacityProp.getName()).toBe('link-opacity');
  });
});
