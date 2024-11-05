import Property from '../../core/property/Property.ts';

export default class TextTransformProp extends Property {
  static name: string = 'text-transform';

  defaultValue: any[] = ['text-capitalize'];
  availableValues: Record<any, any>[] = [
    {
      lowercase: 'text-lowercase',
      uppercase: 'text-uppercase',
      capitalize: 'text-capitalize',
    }
  ];

  getName(): string {
    return TextTransformProp.name;
  }
}
