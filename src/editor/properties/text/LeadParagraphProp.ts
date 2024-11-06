import Property from '../../core/property/Property.ts';

export default class LeadParagraphProp extends Property {
  static name: string = 'lead-paragraph';

  defaultValue: any[] = [null];
  availableValues: Record<any, any>[] = [
    {
      checked: 'lead',
    },
  ];

  getName(): string {
    return LeadParagraphProp.name;
  }
}
