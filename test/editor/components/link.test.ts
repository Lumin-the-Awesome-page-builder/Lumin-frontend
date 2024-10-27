import { describe, expect, it } from 'vitest';
import Link from '@/editor/components/Link.ts';
import FontWeightProp from '@/editor/properties/text/FontWeightProp.ts';
import InlineTextProps from '@/editor/properties/text/InlineTextProps.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';
import LinkUnderlineProp from '@/editor/properties/link/LinkUnderlineProp.ts';
import LinkUnderlineOpacity from '@/editor/properties/link/LinkUnderlineOpacity.ts';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';

describe('Test link component', () => {
  it('Test component creation', () => {
    const link = new Link('');

    expect(link.elementName).toBe('a');
  });

  it('Test available component props', () => {
    const link = new Link('');
    expect(link.availableProps).toStrictEqual([
      LinkOpacityProp.name,
      LinkUnderlineProp.name,
      LinkUnderlineOpacity.name,
      LinkUnderlineOffsetProp.name,
      FontWeightProp.name,
      InlineTextProps.name,
      LeadParagraphProp.name,
      MonoSpaceProp.name,
      TextAlignProp.name,
      TextTransformProp.name,
    ]);
  });
});
