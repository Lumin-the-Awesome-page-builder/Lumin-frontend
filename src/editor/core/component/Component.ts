import Property from '@/editor/core/property/Property';
import Attribute, { AttributeObject } from '@/editor/core/attribute/Attribute';
import PropertyCollection from '@/editor/core/property/PropertyCollection';
import AttributeCollection from '@/editor/core/attribute/AttributeCollection';

export type ComponentObject = {
  name: string;
  key: string;
  attrs: AttributeObject[];
  children: ComponentObject[];
  identifier: string;
  content: string;
  props: any[];
  specific: any;
};

export default abstract class Component {
  public htmlElement: HTMLElement = document.createElement('div');
  public props: PropertyCollection = PropertyCollection.empty();
  public attributes: AttributeCollection = AttributeCollection.empty();
  public children: Component[] = [];
  public content: string = '';
  public key: string = '';
  public keySalt: string = '';

  public availableProps: string[];

  public parent: Component | null = null;
  public handler = () => {}

  public findTop(): Component[] {
    const parents: Component[] = [];
    let currentComponent = this
    while (currentComponent != null) {
      parents.push(currentComponent);
      currentComponent = currentComponent.parent;
    }
    return parents
  }

  constructor(public elementName: string) {
    this.htmlElement = document.createElement(this.elementName);
  }

  setEventHandler(func) {
    this.handler = func;
  }

  setListener(eventName) {
    this.htmlElement.addEventListener(eventName, (ev) => {
      ev.stopPropagation();
      this.handler(
        eventName, this.findTop()
      )
    })
  }

  setAttrs(attrs: AttributeObject[]) {
    attrs.forEach((attr) => {
      this.attributes.add(new Attribute(attr.name, attr.value));
    });
  }

  setKeySalt(keySalt: string) {
    this.keySalt = keySalt;
  }

  setKey(key: string) {
    this.key = key;
    this.attributes.add(new Attribute(this.key));
  }

  generateKey() {
    this.setKey(`data-${this.keySalt}-${this.elementName}-${Date.now()}`);
  }

  setProps(props: Property[]) {
    props.forEach((prop) => {
      this.props.set(prop.getName(), prop);
    });
  }

  setParent(component: Component): Component {
    this.parent = component;
    return this;
  }

  appendChild(child: Component) {
    this.appendChildren([child.setParent(this)]);
  }

  appendChildren(children: Component[]) {
    this.children.push(...children.map((el) => el.setParent(this)));
  }

  setContent(content: string) {
    this.content = content;
  }

  applyProps(): void {
    this.props.getAll().forEach((prop) => {
      prop.apply(this);
    });
  }

  applyAttributes(): void {
    this.attributes.getAll().forEach((attr) => {
      this.htmlElement.setAttribute(attr.htmlName, attr.value);
    });
  }

  render() {
    this.applyProps();
    this.applyAttributes();
    this.setListener("click")

    this.htmlElement.innerHTML = '';
    this.htmlElement.innerText = '';

    if (this.children && this.children.length)
      this.children.forEach((el) => this.htmlElement.appendChild(el.render()));
    else this.htmlElement.innerText = this.content;

    if (!this.children.length && (!this.content || this.content == '')) {
      this.htmlElement.classList.add('empty-item');
    }

    return this.htmlElement;
  }

  update() {
    if (this.parent) this.parent.render();
    else this.render();
  }
}
