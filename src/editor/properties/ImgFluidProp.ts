import Property from '../core/property/Property';

export default class ImgFluidProp extends Property {
  static name: string = 'img-fluid';

  defaultValue: any[] = [null];
  availableValues: Record<any, any>[] = [
    {
      checked: 'img-fluid',
    },
  ];

  getName(): string {
    return ImgFluidProp.name;
  }
}
