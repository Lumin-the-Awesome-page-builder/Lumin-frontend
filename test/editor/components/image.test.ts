import { describe, expect, it } from 'vitest';
import Image from '@/editor/components/Image.ts';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';

describe('Test image component', () => {
  it('Test component creation', () => {
    const image = new Image('');

    expect(image.elementName).toBe('img');
  });

  it('Test available component props', () => {
    const image = new Image('');
    expect(image.availableProps).toStrictEqual([BorderRadiusProp.name]);
  });
});
