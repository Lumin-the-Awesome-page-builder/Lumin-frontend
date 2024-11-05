import Property from '../core/property/Property';

export default class AlignContentProp extends Property {
  static name: string = 'align-content';

  defaultValue: any[] = ['start'];
  availableValues: Record<any, any>[] = [
    {
      center: 'align-content-center',
      end: 'align-content-end',
      start: 'align-content-start',
      between: 'align-content-between',
      around: 'align-content-around',
    }
  ];

  getName(): string {
    return AlignContentProp.name;
  }
}
