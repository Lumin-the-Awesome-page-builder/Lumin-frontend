import Property from '../../core/property/Property.ts';

export default class ListInlineProp extends Property {
  static name: string = 'list-inline';

  defaultValue: any[] = [null];
  availableValues: Record<any, any>[] = [
    {
      checked: 'list-inline',
    },
  ];

  getName(): string {
    return ListInlineProp.name;
  }
}
