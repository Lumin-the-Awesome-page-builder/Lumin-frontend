import { describe, expect, it } from 'vitest';
import ImgFluidProp from '@/editor/properties/ImgFluidProp.ts';

describe('Border Radius prop test', () => {
  it('Correct class creation', () => {
    const imgFluidProp = new ImgFluidProp('value');

    expect(imgFluidProp.value).toBe('value');
    expect(imgFluidProp.defaultValue).toBe('imgFluid');
    expect(imgFluidProp.description).toBe('___');
    expect(imgFluidProp.title).toBe('___');
    expect(imgFluidProp.availableValues).toStrictEqual({
      imgFluid: 'img-fluid',
    });
    expect(ImgFluidProp.name).toBe('img-fluid');
  });

  it('Correct name getter', () => {
    const imgFluidProp = new ImgFluidProp('value');

    expect(imgFluidProp.getName()).toBe('img-fluid');
  });
});
