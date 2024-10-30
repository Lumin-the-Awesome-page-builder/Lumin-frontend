import Property from '../../core/property/Property.ts';

export default class TextAlignProp extends Property {
  static name: string = 'text-align';

  defaultValue: string = 'start';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    start: 'text-start',
    end: 'text-end',
    center: 'text-center',
  };

  getName(): string {
    return TextAlignProp.name;
  }
}
