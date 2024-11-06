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
  pure: boolean;
};

export default abstract class Component {
  public abstract name: string;
  public htmlElement: HTMLElement = document.createElement('div');
  public props: PropertyCollection = PropertyCollection.empty();
  public attributes: AttributeCollection = AttributeCollection.empty();
  public children: Record<string, Component> = {};
  public content: string = '';
  public key: string = '';
  public keySalt: string = '';
  public scopeIdentifier: string = '';

  public availableProps: string[];

  public parent: Component | null = null;
  //Pure means that component is pure html+css+js code wrote by user
  public pure: boolean = false;
  public specific: any = null;

  public handler = (ev, handler) => {
    console.log(ev, handler);
  };

  public findTop(): Component[] {
    const parents: Component[] = [];
    let currentComponent: Component = this;
    while (currentComponent != null) {
      parents.push(currentComponent);
      currentComponent = currentComponent.parent;
    }
    return parents;
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
      this.handler(eventName, this.findTop());
    });
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
    this.appendChildren({ [child.key]: child.setParent(this) });
  }

  removeChild(key: string) {
    delete this.children[key];
  }

  replaceChild(onReplace: Component) {
    this.children[onReplace.key] = onReplace;
  }

  appendChildren(children: Record<string, Component>) {
    Object.keys(children).forEach((key) => {
      children[key].setParent(this);
    });
    Object.assign(this.children, children);
  }

  setContent(content: string) {
    this.content = content;
  }

  applyProps(): void {
    this.props.getAll().forEach((prop) => {
      prop.apply();
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
    this.setListener('click');

    this.htmlElement.innerHTML = '';
    this.htmlElement.innerText = '';

    if (this.children && Object.keys(this.children).length)
      Object.keys(this.children).forEach((key) =>
        this.htmlElement.appendChild(this.children[key].render(pure)),
      );
    else this.htmlElement.innerText = this.content;

    if (
      !Object.keys(this.children).length &&
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
    let children = Object.keys(this.children).map((key) => {
      const el = this.children[key];
      return { [el.key]: el.toJson() };
    });
    if (children.length)
      children = children.reduce((prev, current) =>
        Object.assign(prev, current),
      );
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
      children,
      content: this.content,
      specific: this.specific,
      pure: this.pure,
    };
  }
}
