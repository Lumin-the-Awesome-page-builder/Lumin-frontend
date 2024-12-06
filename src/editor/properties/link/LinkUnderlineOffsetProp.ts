import Property from '@/editor/core/property/Property.ts';

export default class LinkUnderlineOffsetProp extends Property {
  static name: string = 'link-offset';

  defaultValue: any[] = [null];
  availableValues: Record<any, any>[] = [
    {
      0: 'link-offset-0',
      33: 'link-offset-1',
      66: 'link-offset-2',
      100: 'link-offset-3',
    },
  ];

  getName(): string {
    return LinkUnderlineOffsetProp.name;
  }
}
