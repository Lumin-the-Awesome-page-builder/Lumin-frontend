import { describe, expect, it } from 'vitest';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';

describe('Lead paragraph prop test', () => {
  it('Correct class creation', () => {
    const leadParagraphProp = new LeadParagraphProp('value');

    expect(leadParagraphProp.value).toBe('value');
    expect(leadParagraphProp.defaultValue).toStrictEqual([null]);
    expect(leadParagraphProp.availableValues).toStrictEqual([
      {
        checked: 'lead',
      },
    ]);
    expect(LeadParagraphProp.name).toBe('lead-paragraph');
  });

  it('Correct name getter', () => {
    const leadParagraphProp = new LeadParagraphProp('value');

    expect(leadParagraphProp.getName()).toBe('lead-paragraph');
  });
});
