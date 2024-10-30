import { describe, expect, it } from 'vitest';
import LinkUnderlineProp from '@/editor/properties/link/LinkUnderlineProp.ts';

describe('Link Underline prop test', () => {
  it('Correct class creation', () => {
    const linkUnderlineProp = new LinkUnderlineProp('value');

    expect(linkUnderlineProp.value).toBe('value');
    expect(linkUnderlineProp.defaultValue).toBe('primary');
    expect(linkUnderlineProp.description).toBe('___');
    expect(linkUnderlineProp.title).toBe('___');
    expect(linkUnderlineProp.availableValues).toStrictEqual({
      primary: 'link-underline-primary',
      secondary: 'link-underline-secondary',
      success: 'link-underline-success',
      danger: 'link-underline-danger',
      warning: 'link-underline-warning',
      info: 'link-underline-info',
      light: 'link-underline-light',
      dark: 'link-underline-dark',
    });
    expect(LinkUnderlineProp.name).toBe('link-underline');
  });

  it('Correct name getter', () => {
    const linkUnderlineProp = new LinkUnderlineProp('value');

    expect(linkUnderlineProp.getName()).toBe('link-underline');
  });
});
