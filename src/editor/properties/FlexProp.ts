import Property from '../core/property/Property';

export default class FlexProp extends Property {
  static name: string = 'flex';

  defaultValue: string = 'flex';
  description: string = '___';
  title: string = '___';
  values: Record<string, any> = { flex: 'd-flex' };

  getName(): string {
    return FlexProp.name;
  }
}
