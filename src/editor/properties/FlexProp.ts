import Property from '../core/property/Property';

export default class FlexProp extends Property {
  static name: string = 'flex';

  defaultValue: any[] = ['flex'];
  availableValues: Record<any, any>[] = [{ flex: 'd-flex' }];

  getName(): string {
    return FlexProp.name;
  }
}
