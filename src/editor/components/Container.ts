import Component from "@/editor/core/component/Component";


export default class Container extends Component {
  constructor(_:string) {
    super("div");
  }

  applyAttributes(): void {
    this.attributes.getAll().forEach(attr => {
      this.htmlElement.setAttribute(attr.htmlName, attr.value)
    })
  }

  applyProperties(): void {
    return
  }

}
