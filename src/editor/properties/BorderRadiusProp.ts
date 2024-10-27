import Property from '../core/property/Property';

export default class BorderRadiusProp extends Property {
  static name: string = 'border-radius';

  defaultValue: string = 'r0';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    r0: 'rounded-0',
    r1: 'rounded-1',
    r2: 'rounded-2',
    r3: 'rounded-3',
    r4: 'rounded-4',
    r5: 'rounded-5',
  };

  getName(): string {
    return BorderRadiusProp.name;
  }
}
