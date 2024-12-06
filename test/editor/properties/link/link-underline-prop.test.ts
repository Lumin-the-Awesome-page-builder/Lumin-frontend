import { describe, expect, it } from 'vitest';
import LinkColorProp from '@/editor/properties/link/LinkColorProp.ts';

describe('Link Underline prop test', () => {
  it('Correct class creation', () => {
    const linkUnderlineProp = new LinkColorProp('value');

    expect(linkUnderlineProp.value).toBe('value');
    expect(linkUnderlineProp.defaultValue).toStrictEqual(['primary']);
    expect(linkUnderlineProp.availableValues).toStrictEqual([
      {
        primary: 'link-primary',
        secondary: 'link-secondary',
        success: 'link-success',
        danger: 'link-danger',
        warning: 'link-warning',
        info: 'link-info',
        light: 'link-light',
        dark: 'link-dark',
      },
    ]);
    expect(LinkColorProp.name).toBe('link-color');
  });

  it('Correct name getter', () => {
    const linkUnderlineProp = new LinkColorProp('value');

    expect(linkUnderlineProp.getName()).toBe('link-color');
  });
});
