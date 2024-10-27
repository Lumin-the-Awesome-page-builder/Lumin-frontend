import { describe, expect, it } from 'vitest';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';

describe('Link opacity prop test', () => {
  it('Correct class creation', () => {
    const linkOpacityProp = new LinkOpacityProp('value');

    expect(linkOpacityProp.value).toBe('value');
    expect(linkOpacityProp.defaultValue).toBe('opacity100');
    expect(linkOpacityProp.description).toBe('___');
    expect(linkOpacityProp.title).toBe('___');
    expect(linkOpacityProp.availableValues).toStrictEqual({
      opacity10: 'link-opacity-10',
      opacity25: 'link-opacity-25',
      opacity50: 'link-opacity-50',
      opacity75: 'link-opacity-75',
      opacity100: 'link-opacity-100',
      opacityHover10: 'link-opacity-10-hover',
      opacityHover25: 'link-opacity-25-hover',
      opacityHover50: 'link-opacity-50-hover',
      opacityHover75: 'link-opacity-75-hover',
      opacityHover100: 'link-opacity-100-hover',
    });
    expect(LinkOpacityProp.name).toBe('link-opacity');
  });

  it('Correct name getter', () => {
    const linkOpacityProp = new LinkOpacityProp('value');

    expect(linkOpacityProp.getName()).toBe('link-opacity');
  });
});
