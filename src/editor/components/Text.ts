import Component from '@/editor/core/component/Component';
import FontWeightProp from '@/editor/properties/text/FontWeightProp.ts';
import InlineTextProps from '@/editor/properties/text/InlineTextProps.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';

export default class Text extends Component {
  constructor(_: string) {
    console.log(_);
    super('p');
  }

  name: string = 'text';

  availableProps: string[] = [
    FontWeightProp.name,
    InlineTextProps.name,
    LeadParagraphProp.name,
    MonoSpaceProp.name,
    TextAlignProp.name,
    TextTransformProp.name,
  ];
}
