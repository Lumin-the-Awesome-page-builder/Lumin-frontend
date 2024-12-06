import Property from '../core/property/Property';

export default class AlignItemsProp extends Property {
  static name: string = 'align-items';

  defaultValue: any[] = ['start'];
  availableValues: Record<any, any>[] = [
    {
      start: 'align-items-start',
      end: 'align-items-end',
      center: 'align-items-center',
      baseline: 'align-items-baseline',
      stretch: 'align-items-stretch',
    },
  ];

  getName(): string {
    return AlignItemsProp.name;
  }
}
