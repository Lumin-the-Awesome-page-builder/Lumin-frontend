import { describe, expect, it } from 'vitest';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';

describe('Lead paragraph prop test', () => {
  it('Correct class creation', () => {
    const leadParagraphProp = new LeadParagraphProp('value');

    expect(leadParagraphProp.value).toBe('value');
    expect(leadParagraphProp.defaultValue).toBe('lead');
    expect(leadParagraphProp.description).toBe('___');
    expect(leadParagraphProp.title).toBe('___');
    expect(leadParagraphProp.availableValues).toStrictEqual({
      lead: 'lead',
    });
    expect(LeadParagraphProp.name).toBe('lead-paragraph');
  });

  it('Correct name getter', () => {
    const leadParagraphProp = new LeadParagraphProp('value');

    expect(leadParagraphProp.getName()).toBe('lead-paragraph');
  });
});
