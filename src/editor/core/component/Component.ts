import Property, { PropertyObject } from '@/editor/core/property/Property';
import Attribute, { AttributeObject } from '@/editor/core/attribute/Attribute';
import PropertyCollection from '@/editor/core/property/PropertyCollection';
import AttributeCollection from '@/editor/core/attribute/AttributeCollection';

export type ComponentObject = {
  name: string;
  key: string;
  attrs: AttributeObject[];
  props: PropertyObject[];
  content: string;
  children: ComponentObject[];
  specific: any;
};

export default abstract class Component {
  public abstract name: string;
  public htmlElement: HTMLElement = document.createElement('div');
  public props: PropertyCollection = PropertyCollection.empty();
  public attributes: AttributeCollection = AttributeCollection.empty();
  public children: Component[] = [];
  public content: string = '';
  public key: string = '';
  public keySalt: string = '';
  public scopeIdentifier: string = '';

  public availableProps: string[];

  public parent: Component | null = null;

  constructor(public elementName: string) {
    this.htmlElement = document.createElement(this.elementName);
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
    this.keySalt = this.parent.keySalt;
    this.scopeIdentifier = this.parent.scopeIdentifier;
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

  render(pure: boolean = false) {
    if (pure) {
      this.attributes.remove(this.key);
      this.attributes.remove(this.scopeIdentifier);
    }

    this.applyProps();
    this.applyAttributes();

    this.htmlElement.innerHTML = '';
    this.htmlElement.innerText = '';

    if (this.children && this.children.length)
      this.children.forEach((el) =>
        this.htmlElement.appendChild(el.render(pure)),
      );
    else this.htmlElement.innerText = this.content;

    if (
      !this.children.length &&
      (!this.content || this.content == '') &&
      !pure
    ) {
      this.htmlElement.classList.add('empty-item');
    }

    return this.htmlElement;
  }

  update() {
    if (this.parent) this.parent.render();
    else this.render();
  }

  toJson(): ComponentObject {
    const systemArgs = ['class', this.key, this.scopeIdentifier];
    return {
      name: this.name,
      key: this.key,
      attrs: this.attributes
        .getAll()
        .filter((attr) => !systemArgs.includes(attr.htmlName))
        .map((attr) => ({
          name: attr.htmlName,
          value: attr.value,
        })),
      props: this.props.getAll().map((prop) => ({
        name: prop.getName(),
        value: prop.value,
      })),
      children: this.children.map((el) => el.toJson()),
      content: this.content,
      specific: null,
    };
  }
}
