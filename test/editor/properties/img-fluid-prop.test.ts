import { describe, expect, it } from 'vitest';
import ImgFluidProp from '@/editor/properties/ImgFluidProp.ts';

describe('Border Radius prop test', () => {
  it('Correct class creation', () => {
    const imgFluidProp = new ImgFluidProp('value');

    expect(imgFluidProp.value).toBe('value');
    expect(imgFluidProp.defaultValue).toStrictEqual([null]);
    expect(imgFluidProp.availableValues).toStrictEqual([
      {
        checked: 'img-fluid',
      },
    ]);
    expect(ImgFluidProp.name).toBe('img-fluid');
  });

  it('Correct name getter', () => {
    const imgFluidProp = new ImgFluidProp('value');

    expect(imgFluidProp.getName()).toBe('img-fluid');
  });
});
