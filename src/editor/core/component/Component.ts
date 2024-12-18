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
  children: Record<string, ComponentObject>;
  childrenOrdering: string[];
  specific: any;
  pure: boolean;
};

export default abstract class Component {
  public abstract name: string;
  public userName: string;
  static title: string = 'Component';
  public abstract getTitle(): string;
  public htmlElement: HTMLElement = document.createElement('div');
  public props: PropertyCollection = PropertyCollection.empty();
  public attributes: AttributeCollection = AttributeCollection.empty();
  public children: Record<string, Component> = {};
  public childrenOrdering: string[] = [];
  public content: string = '';
  public key: string = '';
  public keySalt: string = '';
  public scopeIdentifier: string = '';
  public locked: boolean = false;

  //We need to store old keys when start buildTree with refreshKeys arg to correctly render refreshed children
  public oldKey: string | null = null;

  public availableProps: string[];

  public parent: Component | null = null;
  //Pure means that component is pure html+css+js code wrote by user
  public pure: boolean = false;
  public specific: any = null;
  public selected: boolean = false;

  public handler = (ev, handler) => {
    console.log(ev, handler);
  };

  public findTop(hideLocked: boolean = false): Component[] {
    const parents: Component[] = [];
    let currentComponent: Component = this;
    while (currentComponent != null) {
      if (!currentComponent.locked || !hideLocked)
        parents.push(currentComponent);
      currentComponent = currentComponent.parent;
    }
    return parents;
  }

  constructor(
    public elementName: string,
    public objectName: string,
  ) {
    this.htmlElement = document.createElement(this.elementName);
  }

  setEventHandler(func) {
    this.handler = func;
  }

  setListener(eventName) {
    this.htmlElement.addEventListener(eventName, (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.locked) this.handler(eventName, this.findTop(true), ev);
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

  generateKey(append: string = '') {
    this.setKey(
      `data-${this.keySalt}-${this.elementName}-${Date.now()}${append}`,
    );
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

  appendChild(child: Component, placeBefore: string = 'last') {
    if (placeBefore == 'last' || !placeBefore)
      this.appendChildren({ [child.key]: child.setParent(this) });
    else {
      const index = this.childrenOrdering.indexOf(placeBefore);
      this.childrenOrdering = this.childrenOrdering.splice(index, 0, child.key);
      child.setParent(this);
    }
  }

  appendChildren(
    children: Record<string, Component>,
    ordering: string[] | null = null,
  ) {
    if (Object.keys(children).length <= 0) return;

    const virtualKeys = Object.keys(children)
      .map((key) => {
        const child = children[key];
        if (child.oldKey && ordering) {
          return { [child.oldKey]: child.key };
        } else {
          return { [child.key]: child.key };
        }
      })
      .reduce((prev, cur) => Object.assign(prev, cur));

    const order = ordering ? ordering : Object.keys(children);

    order.forEach((key) => {
      const virtualKey = virtualKeys[key];
      children[virtualKey].setParent(this);
      this.childrenOrdering.push(virtualKey);
    });
    Object.assign(this.children, children);
  }

  removeChild(key: string) {
    this.childrenOrdering = this.childrenOrdering.filter(
      (child) => child !== key,
    );
    delete this.children[key];
  }

  replaceChild(onReplace: Component) {
    this.children[onReplace.key] = onReplace;
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
    this.setListener('contextmenu');

    this.htmlElement.innerHTML = '';
    this.htmlElement.innerText = '';

    if (this.children && Object.keys(this.children).length)
      this.childrenOrdering.forEach((key) =>
        this.htmlElement.appendChild(this.children[key].render(pure)),
      );
    else this.htmlElement.innerText = this.content;

    if (
      !Object.keys(this.children).length &&
      (!this.content || this.content == '') &&
      !pure
    ) {
      this.htmlElement.classList.add('empty-item');
    } else {
      this.htmlElement.classList.remove('empty-item');
    }

    if (this.selected) this.setSelected();

    if (!pure) this.htmlElement.classList.add('editor-item');
    else {
      console.log('removed!');
      this.htmlElement.classList.remove('editor-item');
      this.removeSelected();
    }

    return this.htmlElement;
  }

  update() {
    if (this.parent) this.parent.render();
    else this.render();
  }

  setSelected() {
    this.selected = true;
    if (!this.pure) {
      this.htmlElement.classList.add('selected');
    }
  }

  removeSelected() {
    this.selected = false;
    if (!this.pure) {
      this.htmlElement.classList.remove('selected');
    }
  }

  getHTML() {
    if (!this.pure) return this.htmlElement;
    else return this.specific.htmlOnRender;
  }

  toJson(): ComponentObject {
    const systemArgs = ['class', this.key, this.scopeIdentifier];
    let children: any = Object.keys(this.children).map((key) => {
      const el = this.children[key];
      return { [el.key]: el.toJson() };
    });
    if (children.length)
      children = children.reduce((prev, current) =>
        Object.assign(prev, current),
      );
    else children = {};

    console.log('PROPS', this.props);

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
      childrenOrdering: this.childrenOrdering,
      content: this.content,
      specific: this.specific,
      pure: this.pure,
    };
  }
}
