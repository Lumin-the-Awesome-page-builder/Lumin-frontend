import { describe, expect, it } from 'vitest';
import Link from '@/editor/components/Link.ts';
import FontProp from '@/editor/properties/text/FontProp.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';
import LinkColorProp from '@/editor/properties/link/LinkColorProp.ts';
import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';
import ContentProp from '@/editor/properties/ContentProp.ts';

describe('Test link component', () => {
  it('Test component creation', () => {
    const link = new Link('');

    expect(link.elementName).toBe('a');
  });

  it('Test available component props', () => {
    const link = new Link('');
    expect(link.availableProps).toStrictEqual([
      LinkOpacityProp.name,
      LinkColorProp.name,
      LinkUnderlineOpacityProp.name,
      LinkUnderlineOffsetProp.name,
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
