import Property from '../../core/property/Property.ts';

export default class LinkOpacityProp extends Property {
  static name: string = 'link-opacity';

  defaultValue: string = 'opacity100';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    opacity10: 'link-opacity-10',
    opacity25: 'link-opacity-25',
    opacity50: 'link-opacity-50',
    opacity75: 'link-opacity-75',
    opacity100: 'link-opacity-100',
    opacityHover10: 'link-opacity-10-hover',
    opacityHover25: 'link-opacity-25-hover',
    opacityHover50: 'link-opacity-50-hover',
    opacityHover75: 'link-opacity-75-hover',
    opacityHover100: 'link-opacity-100-hover',
  };

  getName(): string {
    return LinkOpacityProp.name;
  }
}
