import Property from '../core/property/Property';

export default class JustifyContentProp extends Property {
  static name: string = 'justify-content';

  defaultValue: string = 'start';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    start: 'justify-content-start',
    end: 'justify-content-end',
    center: 'justify-content-center',
    between: 'justify-content-between',
    around: 'justify-content-around',
    evenly: 'justify-content-evenly',
  };

  getName(): string {
    return JustifyContentProp.name;
  }
}
