import Component from '@/editor/core/component/Component.ts';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';
import LinkColorProp from '@/editor/properties/link/LinkColorProp.ts';
import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';
import FontProp from '@/editor/properties/text/FontProp.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import ContentProp from '@/editor/properties/ContentProp.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';

export default class Link extends Component {
  constructor(_: string) {
    console.log(_);
    super('a');
  }

  name: string = 'link';
  static title: string = 'Ссылка';

  availableProps: string[] = [
    ComponentNameProp.name,
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
  ];
  getTitle() {
    return Link.title;
  }
}
