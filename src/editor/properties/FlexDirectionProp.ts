import Property from '@/editor/core/property/Property.ts';

export default class FlexDirectionProp extends Property {
  static name: string = 'flex-direction';

  defaultValue: any[] = ['row'];
  availableValues: Record<any, any>[] = [
    {
      col: 'flex-column',
      row: 'flex-row',
    },
  ];

  getName(): string {
    return FlexDirectionProp.name;
  }
}
