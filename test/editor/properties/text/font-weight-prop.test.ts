import { describe, expect, it } from 'vitest';
import FontProp from '@/editor/properties/text/FontProp.ts';

describe('Font weight prop test', () => {
  it('Correct class creation', () => {
    const fontWeightProp = new FontProp('value');

    expect(fontWeightProp.value).toBe('value');
    expect(fontWeightProp.defaultValue).toStrictEqual([50, 'normal']);
    expect(fontWeightProp.availableValues).toStrictEqual([
      {
        0: 'fw-lighter',
        25: 'fw-light',
        50: 'fw-normal',
        75: 'fw-bold',
        100: 'fw-bolder',
      },
      {
        normal: 'fst-normal',
        italic: 'fst-italic',
      },
    ]);
    expect(FontProp.name).toBe('font');
  });

  it('Correct name getter', () => {
    const fontWeightProp = new FontProp('value');

    expect(fontWeightProp.getName()).toBe('font');
  });
});
