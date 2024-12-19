import Component from "../core/component/Component";
import ComponentNameProp from "../properties/ComponentNameProp";
import InputNameProp from "../properties/InputNameProp";
import InputTypeProp from "../properties/InputTypeProp";
import FontProp from "../properties/text/FontProp";
import InlineTextProp from "../properties/text/InlineTextProp";
import LeadParagraphProp from "../properties/text/LeadParagraphProp";
import MonoSpaceProp from "../properties/text/MonoSpaceProp";
import TextAlignProp from "../properties/text/TextAlignProp";
import TextTransformProp from "../properties/text/TextTransformProp";

export default class Input extends Component {
  constructor(_: string = '') {
    console.log(_);
    super('input');
  }

  availableProps: string[] = [
    ComponentNameProp.name,
    InputTypeProp.name,
    InputNameProp.name,
    FontProp.name,
    InlineTextProp.name,
    LeadParagraphProp.name,
    MonoSpaceProp.name,
    TextAlignProp.name,
    TextTransformProp.name,
  ];

  name: string = 'input';
  static _name = 'input';
  static title: string = 'Инпут';
  getTitle() {
    return Input.title;
  }
}