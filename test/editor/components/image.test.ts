import { describe, expect, it } from 'vitest';
import Image from '@/editor/components/Image.ts';

describe('Test image component', () => {
  it('Test component creation', () => {
    const image = new Image('');

    expect(image.elementName).toBe('img');
  });
});
