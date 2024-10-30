import Property from '../../core/property/Property.ts';

export default class LinkUnderlineOffsetProp extends Property {
  static name: string = 'link-offset';

  defaultValue: string = 'link-offset-1';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    one: 'link-offset-1',
    two: 'link-offset-2',
    three: 'link-offset-3',
  };

  getName(): string {
    return LinkUnderlineOffsetProp.name;
  }
}
