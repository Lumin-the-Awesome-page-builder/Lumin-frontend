import Property from '../core/property/Property';

export default class GutterProp extends Property {
  static name: string = 'gap';

  defaultValue: any[] = [0];
  availableValues: Record<any, any>[] = [
    {
      0: 'gap-0',
      20: 'gap-1',
      40: 'gap-2',
      60: 'gap-3',
      80: 'gap-4',
      100: 'gap-5',
    },
  ];

  getName(): string {
    return GutterProp.name;
  }
}
