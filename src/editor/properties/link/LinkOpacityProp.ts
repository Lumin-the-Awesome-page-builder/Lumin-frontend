import Property from '../../core/property/Property.ts';

export default class LinkOpacityProp extends Property {
  static name: string = 'link-opacity';

  defaultValue: any[] = [null, null];
  availableValues: Record<any, any>[] = [
    {
      0: 'link-opacity-0',
      10: 'link-opacity-10',
      25: 'link-opacity-25',
      50: 'link-opacity-50',
      75: 'link-opacity-75',
      100: 'link-opacity-100',
    },
    {
      0: 'link-opacity-0-hover',
      10: 'link-opacity-10-hover',
      25: 'link-opacity-25-hover',
      50: 'link-opacity-50-hover',
      75: 'link-opacity-75-hover',
      100: 'link-opacity-100-hover',
    }
  ];

  getName(): string {
    return LinkOpacityProp.name;
  }
}
