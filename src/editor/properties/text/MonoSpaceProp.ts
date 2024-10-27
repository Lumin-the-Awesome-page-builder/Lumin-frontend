import Property from '../../core/property/Property.ts';

export default class MonoSpaceProp extends Property {
  static name: string = 'font-monospace';

  defaultValue: string = 'monospace';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    monospace: 'font-monospace',
  };

  getName(): string {
    return MonoSpaceProp.name;
  }
}
