import { describe, expect, it } from 'vitest';
import Text from '@/editor/components/Text.ts';
import FontWeightProp from '@/editor/properties/text/FontWeightProp.ts';
import InlineTextProps from '@/editor/properties/text/InlineTextProps.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';

describe('Test text component', () => {
  it('Test component creation', () => {
    const text = new Text('');

    expect(text.elementName).toBe('p');
  });

  it('Test available component props', () => {
    const text = new Text('');
    expect(text.availableProps).toStrictEqual([
      FontWeightProp.name,
      InlineTextProps.name,
      LeadParagraphProp.name,
      MonoSpaceProp.name,
      TextAlignProp.name,
      TextTransformProp.name,
    ]);
  });
});