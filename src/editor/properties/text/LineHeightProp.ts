import Property from '../../core/property/Property.ts';

export default class LineHeightProp extends Property {
  static name: string = 'line-height';

  defaultValue: any[] = [66];
  description: string = '___';
  availableValues: Record<any, any>[] = [
    {
      0: 'lh-1',
      33: 'lh-sm',
      66: 'lh-base',
      100: 'lh-lg',
    },
  ];

  getName(): string {
    return LineHeightProp.name;
  }
}
