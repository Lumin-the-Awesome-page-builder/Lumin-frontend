import Property from '../../core/property/Property.ts';

export default class ListInlineProp extends Property {
  static name: string = 'list-inline';

  defaultValue: string = 'inline';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    inline: 'list-inline',
    item: 'list-inline-item',
  };

  getName(): string {
    return ListInlineProp.name;
  }
}
