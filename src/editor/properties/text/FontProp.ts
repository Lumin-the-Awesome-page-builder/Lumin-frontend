import Property from '@/editor/core/property/Property.ts';

export default class FontProp extends Property {
  static name: string = 'font';

  defaultValue: any[] = [50, 'normal'];
  availableValues: Record<any, any>[] = [
    {
      0: 'fw-lighter',
      25: 'fw-light',
      50: 'fw-normal',
      75: 'fw-bold',
      100: 'fw-bolder',
    },
    {
      normal: 'fst-normal',
      italic: 'fst-italic',
    },
  ];

  getName(): string {
    return FontProp.name;
  }
}
