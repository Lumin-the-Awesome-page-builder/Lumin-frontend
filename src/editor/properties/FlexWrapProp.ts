import Property from '../core/property/Property';

export default class FlexWrapProp extends Property {
  static name: string = 'flex-wrap';

  defaultValue: string = 'flex-wrap';
  description: string = '___';
  name: string = 'flex-wrap';
  title: string = '___';
  values: Record<string, any> = { 'flex-wrap': 'flex-wrap' };

  getName(): string {
    return FlexWrapProp.name;
  }
}
