import Property from '../../core/property/Property.ts';

export default class LeadParagraphProp extends Property {
  static name: string = 'lead-paragraph';

  defaultValue: string = 'lead';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    lead: 'lead',
  };

  getName(): string {
    return LeadParagraphProp.name;
  }
}
