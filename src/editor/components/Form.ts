import Component from "../core/component/Component";
import AlignContentProp from "../properties/AlignContentProp";
import AlignItemsProp from "../properties/AlignItemsProp";
import ColWidthProp from "../properties/ColWidthProp";
import ComponentNameProp from "../properties/ComponentNameProp";
import FlexDirectionProp from "../properties/FlexDirectionProp";
import FlexProp from "../properties/FlexProp";
import FlexWrapProp from "../properties/FlexWrapProp";
import FormManagementTypeProp from "../properties/FormManagementTypeProp";
import FormNameProp from "../properties/FormNameProp";
import GutterProp from "../properties/GutterProp";
import JustifyContentProp from "../properties/JustifyContentProp";

export default class Form extends Component {
  constructor(_: string = '') {
    console.log(_);
    super('form');
  }

  override availableForPasting: string = 'input'

  availableProps: string[] = [
    ComponentNameProp.name,
    FormNameProp.name,
    FormManagementTypeProp.name,
    AlignItemsProp.name,
    AlignContentProp.name,
    ColWidthProp.name,
    FlexDirectionProp.name,
    FlexProp.name,
    FlexWrapProp.name,
    GutterProp.name,
    JustifyContentProp.name,
  ];

  render(pure: boolean = false): HTMLElement {
    const rendered = super.render(pure);

    if (!pure) rendered.classList.add('editor-container-item');
    else rendered.classList.remove('editor-container-item');

    return rendered;
  }

  name: string = 'form';
  static _name = 'form';
  static title: string = 'Форма';
  getTitle() {
    return Form.title;
  }
}