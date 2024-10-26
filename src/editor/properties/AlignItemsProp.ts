import Property from '../core/property/Property';

export default class AlignItemsProp extends Property {
  static name: string = 'align-items';

  defaultValue: string = 'start';
  description: string = '___';
  title: string = '___';
  values: Record<string, any> = {
    start: 'align-items-start',
    end: 'align-items-end',
    center: 'align-items-center',
    between: 'align-items-baseline',
    around: 'align-items-stretch',
  };

  getName(): string {
    return AlignItemsProp.name;
  }
}
