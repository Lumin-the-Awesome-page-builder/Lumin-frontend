import { describe, expect, it } from 'vitest';
import FontWeightProp from '@/editor/properties/text/FontWeightProp.ts';

describe('Font weight prop test', () => {
  it('Correct class creation', () => {
    const fontWeightProp = new FontWeightProp('value');

    expect(fontWeightProp.value).toBe('value');
    expect(fontWeightProp.defaultValue).toBe('normal');
    expect(fontWeightProp.description).toBe('___');
    expect(fontWeightProp.title).toBe('___');
    expect(fontWeightProp.availableValues).toStrictEqual({
      bold: 'fw-bold',
      bolder: 'fw-bolder',
      semibold: 'fw-semibold',
      medium: 'fw-medium',
      normal: 'fw-normal',
      light: 'fw-light',
      lighter: 'fw-lighter',
      italic: 'fst-italic',
      normal: 'fst-normal',
    });
    expect(FontWeightProp.name).toBe('fw');
  });

  it('Correct name getter', () => {
    const fontWeightProp = new FontWeightProp('value');

    expect(fontWeightProp.getName()).toBe('fw');
  });
});
