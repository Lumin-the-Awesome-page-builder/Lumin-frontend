import Property from '../core/property/Property';

export default class AlignSelfProp extends Property {
  static name: string = 'align-self';

  defaultValue: string = 'start';
  description: string = '___';
  title: string = '___';
  values: Record<string, any> = {
    start: 'align-self-start',
    end: 'align-self-end',
    center: 'align-self-center',
    between: 'align-self-baseline',
    around: 'align-self-stretch',
  };

  getName(): string {
    return AlignSelfProp.name;
  }
}
