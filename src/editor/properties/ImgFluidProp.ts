import Property from '../core/property/Property';

export default class ImgFluidProp extends Property {
  static name: string = 'img-fluid';

  defaultValue: string = 'imgFluid';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    imgFluid: 'img-fluid',
  };

  getName(): string {
    return ImgFluidProp.name;
  }
}
