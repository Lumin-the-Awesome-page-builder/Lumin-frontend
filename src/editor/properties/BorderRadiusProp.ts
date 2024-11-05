import Property from '../core/property/Property';

export default class BorderRadiusProp extends Property {
  static name: string = 'border-radius';

  defaultValue: any[] = [0];
  availableValues: Record<any, any>[] = [
    {
      0: 'rounded-0',
      20: 'rounded-1',
      40: 'rounded-2',
      60: 'rounded-3',
      80: 'rounded-4',
      100: 'rounded-5',
    }
  ];

  getName(): string {
    return BorderRadiusProp.name;
  }
}
