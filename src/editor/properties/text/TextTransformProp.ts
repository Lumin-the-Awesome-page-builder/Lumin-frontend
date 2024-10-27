import Property from '../../core/property/Property.ts';

export default class TextTransformProp extends Property {
  static name: string = 'text-transform';

  defaultValue: string = 'text-capitalize';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    lowercase: 'text-lowercase',
    uppercase: 'text-uppercase',
    capitalize: 'text-capitalize',
  };

  getName(): string {
    return TextTransformProp.name;
  }
}
