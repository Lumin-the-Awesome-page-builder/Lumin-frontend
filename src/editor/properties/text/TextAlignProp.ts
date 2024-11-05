import Property from '../../core/property/Property.ts';

export default class TextAlignProp extends Property {
  static name: string = 'text-align';

  defaultValue: any[] = ['start'];
  availableValues: Record<any, any>[] = [
    {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
    }
  ];

  getName(): string {
    return TextAlignProp.name;
  }
}
