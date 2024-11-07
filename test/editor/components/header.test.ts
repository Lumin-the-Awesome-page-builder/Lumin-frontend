import { describe, expect, it } from 'vitest';
import Header from '@/editor/components/Header.ts';
import FontProp from '@/editor/properties/text/FontProp.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import ContentProp from '@/editor/properties/ContentProp.ts';

describe('Test header component', () => {
  it('Test component creation', () => {
    [1, 2, 3, 4, 5, 6].forEach((level) => {
      const header = new Header(level);

      expect(header.elementName).toBe(`h${level}`);
    });
  });

  it('Test available component props', () => {
    const header = new Header(1);
    expect(header.availableProps).toStrictEqual([
      FontProp.name,
      InlineTextProp.name,
      LeadParagraphProp.name,
      MonoSpaceProp.name,
      TextAlignProp.name,
      TextTransformProp.name,
      ContentProp.name,
    ]);
  });
});
