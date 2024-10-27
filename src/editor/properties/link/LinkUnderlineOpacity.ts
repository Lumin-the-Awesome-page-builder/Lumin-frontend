import Property from '../../core/property/Property.ts';

export default class LinkUnderlineOpacity extends Property {
  static name: string = 'link-underline-opacity';

  defaultValue: string = 'opacity100';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    opacity0: 'link-underline-opacity-0',
    opacity10: 'link-underline-opacity-10',
    opacity25: 'link-underline-opacity-25',
    opacity50: 'link-underline-opacity-50',
    opacity75: 'link-underline-opacity-75',
    opacity100: 'link-underline-opacity-100',
  };

  getName(): string {
    return LinkUnderlineOpacity.name;
  }
}
