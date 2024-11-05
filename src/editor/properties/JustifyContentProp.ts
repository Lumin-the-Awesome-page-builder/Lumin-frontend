import Property from '../core/property/Property';

export default class JustifyContentProp extends Property {
  static name: string = 'justify-content';

  defaultValue: any[] = ['start'];
  availableValues: Record<any, any>[] = [
    {
      center: 'justify-content-center',
      end: 'justify-content-end',
      start: 'justify-content-start',
      around: 'justify-content-around',
      between: 'justify-content-between',
      evenly: 'justify-content-evenly',
    }
  ];

  getName(): string {
    return JustifyContentProp.name;
  }
}
