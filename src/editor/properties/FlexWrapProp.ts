import Property from '../core/property/Property';

export default class FlexWrapProp extends Property {
  static name: string = 'flex-wrap';

  defaultValue: any[] = ['flex-wrap'];
  availableValues: Record<any, any>[] = [{ 'flex-wrap': 'flex-wrap' }];

  getName(): string {
    return FlexWrapProp.name;
  }
}
