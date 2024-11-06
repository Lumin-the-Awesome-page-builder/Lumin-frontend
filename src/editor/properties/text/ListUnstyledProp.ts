import Property from '../../core/property/Property.ts';

export default class ListUnstyledProp extends Property {
  static name: string = 'list-unstyled';

  defaultValue: any[] = [null];
  availableValues: Record<any, any>[] = [
    {
      checked: 'list-unstyled',
    },
  ];

  getName(): string {
    return ListUnstyledProp.name;
  }
}
