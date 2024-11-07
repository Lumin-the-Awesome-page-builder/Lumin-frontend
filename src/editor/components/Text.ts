import Component from '@/editor/core/component/Component';
import FontProp from '@/editor/properties/text/FontProp.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import ContentProp from '@/editor/properties/ContentProp.ts';

export default class Text extends Component {
  constructor(_: string) {
    console.log(_);
    super('p');
  }

  name: string = 'text';
  static title: string = 'Текст';

  content = "Text"

  availableProps: string[] = [
    FontProp.name,
    InlineTextProp.name,
    LeadParagraphProp.name,
    MonoSpaceProp.name,
    TextAlignProp.name,
    TextTransformProp.name,
    ContentProp.name
  ];
}
