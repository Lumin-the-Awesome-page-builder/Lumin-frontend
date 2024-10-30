import { describe, expect, it } from 'vitest';
import Header from '@/editor/components/Header.ts';
import FontWeightProp from '@/editor/properties/text/FontWeightProp.ts';
import InlineTextProps from '@/editor/properties/text/InlineTextProps.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';

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
      FontWeightProp.name,
      InlineTextProps.name,
      LeadParagraphProp.name,
      MonoSpaceProp.name,
      TextAlignProp.name,
      TextTransformProp.name,
    ]);
  });
});