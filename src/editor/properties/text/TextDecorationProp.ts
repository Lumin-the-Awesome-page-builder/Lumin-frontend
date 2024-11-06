import Property from '@/editor/core/property/Property.ts';

export default class TextDecorationProp extends Property {
  static name: string = 'text-decoration';

  defaultValue: any[] = [null];
  availableValues: Record<any, any>[] = [
    {
      none: 'text-decoration-none',
      line_through: 'text-decoration-line-through',
      underline: 'text-decoration-underline',
    },
  ];

  getName(): string {
    return TextDecorationProp.name;
  }
}
