import Property from '../../core/property/Property.ts';

export default class ListUnstyledProp extends Property {
  static name: string = 'list-unstyled';

  defaultValue: string = 'unstyled';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    unsyled: 'list-unstyled',
  };

  getName(): string {
    return ListUnstyledProp.name;
  }
}
