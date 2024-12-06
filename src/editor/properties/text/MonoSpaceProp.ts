import Property from '../../core/property/Property.ts';

export default class MonoSpaceProp extends Property {
  static name: string = 'font-monospace';

  defaultValue: any[] = [null];
  availableValues: Record<any, any>[] = [
    {
      checked: 'font-monospace',
    },
  ];

  getName(): string {
    return MonoSpaceProp.name;
  }
}
