import Property from '../core/property/Property';

export default class ColWidthProp extends Property {
  static name: string = 'col';

  defaultValue: any[] = [0];
  availableValues: Record<any, any>[] = [
    {
      0: 'col',
      8: 'col-1',
      16: 'col-2',
      25: 'col-3',
      33: 'col-4',
      41: 'col-5',
      50: 'col-6',
      58: 'col-7',
      66: 'col-8',
      75: 'col-9',
      83: 'col-10',
      91: 'col-11',
      100: 'col-12',
    }
  ];

  getName(): string {
    return ColWidthProp.name;
  }
}
