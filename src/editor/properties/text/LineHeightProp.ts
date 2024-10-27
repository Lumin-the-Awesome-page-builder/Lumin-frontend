import Property from '../../core/property/Property.ts';

export default class LineHeightProp extends Property {
  static name: string = 'lh';

  defaultValue: string = 'base';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    one: 'lh-1',
    small: 'lh-sm',
    base: 'lh-base',
    large: 'lh-lg',
  };

  getName(): string {
    return LineHeightProp.name;
  }
}
