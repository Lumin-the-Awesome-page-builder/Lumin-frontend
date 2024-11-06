import Property from '@/editor/core/property/Property.ts';

export default class InlineTextProp extends Property {
  static name: string = 'inline-text';

  defaultValue: any[] = [null, null];
  availableValues: Record<any, any>[] = [
    {
      checked: 'mark',
    },
    {
      checked: 'small',
    },
  ];

  getName(): string {
    return InlineTextProp.name;
  }
}
