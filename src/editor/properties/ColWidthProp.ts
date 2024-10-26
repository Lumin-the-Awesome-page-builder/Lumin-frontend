import Property from '../core/property/Property';

export default class ColWidthProp extends Property {
  static name: string = 'col';

  defaultValue: string = 'col';
  description: string = '___';
  title: string = '___';
  values: Record<string, any> = {
    c1: 'col-1',
    c2: 'col-2',
    c3: 'col-3',
    c4: 'col-4',
    c5: 'col-5',
    c6: 'col-6',
    c7: 'col-7',
    c8: 'col-8',
    c9: 'col-9',
    c10: 'col-10',
    c11: 'col-11',
    c12: 'col-12',
  };

  getName(): string {
    return ColWidthProp.name;
  }
}
