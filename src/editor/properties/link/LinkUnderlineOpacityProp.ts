import Property from '@/editor/core/property/Property.ts';

export default class LinkUnderlineOpacityProp extends Property {
  static name: string = 'link-underline-opacity';

  defaultValue: any[] = [null, null];
  availableValues: Record<any, any>[] = [
    {
      0: 'link-underline-opacity-0',
      10: 'link-underline-opacity-10',
      25: 'link-underline-opacity-25',
      50: 'link-underline-opacity-50',
      75: 'link-underline-opacity-75',
      100: 'link-underline-opacity-100',
    },
    {
      0: 'link-underline-opacity-0-hover',
      10: 'link-underline-opacity-10-hover',
      25: 'link-underline-opacity-25-hover',
      50: 'link-underline-opacity-50-hover',
      75: 'link-underline-opacity-75-hover',
      100: 'link-underline-opacity-100-hover',
    }
  ];

  getName(): string {
    return LinkUnderlineOpacityProp.name;
  }
}
