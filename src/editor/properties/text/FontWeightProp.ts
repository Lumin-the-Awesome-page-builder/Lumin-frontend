import Property from '../../core/property/Property.ts';

export default class FontWeightProp extends Property {
  static name: string = 'fw';

  defaultValue: string = 'normal';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    bold: 'fw-bold',
    bolder: 'fw-bolder',
    semibold: 'fw-semibold',
    medium: 'fw-medium',
    normal: 'fw-normal',
    light: 'fw-light',
    lighter: 'fw-lighter',
    italic: 'fst-italic',
    normal: 'fst-normal',
  };

  getName(): string {
    return FontWeightProp.name;
  }
}
