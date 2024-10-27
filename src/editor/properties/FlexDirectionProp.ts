import Property from '@/editor/core/property/Property.ts';

export default class FlexDirectionProp extends Property {
  static name: string = 'flex-direction';

  defaultValue: string = 'row';
  description: string = 'Description';
  title: string = '----';
  availableValues: Record<string, any> = {
    row: 'flex-row',
    col: 'flex-column',
  };

  getName(): string {
    return FlexDirectionProp.name;
  }
}
