import Component, {
  ComponentObject,
} from '@/editor/core/component/Component.ts';
import Property, { PropertyObject } from '@/editor/core/property/Property.ts';

export class App {
  public rootHTML: HTMLElement = document.createElement('div');
  public root: Component[] = [];
  public state: Record<string, Component> = {};
  public componentLibrary: Record<string, any> = {};
  public propLibrary: Record<string, any> = {};
  public mountPoint: string = '';
  public identifiersSalt: string = '';
  public scopeIdentifier: string = '';
  public initState: ComponentObject[] = [];

  // "event": [([parents] => {},)]
  public subs = {
    click: [],
    dblclick: [],
    contextmenu: [],
  };

  init(
    mountPoint: string,
    identifierSalt: string,
    initState: ComponentObject[] = [],
  ) {
    this.mountPoint = mountPoint;
    this.identifiersSalt = identifierSalt;
    this.initState = initState;

    const root = document.getElementById(this.mountPoint);
    if (!root) {
      throw new DOMException('Bad root element provided');
    }

    this.scopeIdentifier = root.attributes[0].name;

    this.rootHTML = root;
  }

  public use<T extends typeof Component>(name: string, component: T) {
    this.componentLibrary[name] = component;
  }

  public useProp<T extends typeof Property>(prop: T) {
    this.propLibrary[prop.name] = prop;
  }

  public buildProps(props: PropertyObject[]): any[] {
    return props.map((prop) => {
      const propConstructor = this.propLibrary[prop.name];

      if (!propConstructor)
        throw new DOMException(`Unknown property: ${prop.name}`);

      return new propConstructor(prop.value);
    });
  }

  public buildTree(state: ComponentObject[]): Component[] {
    return state
      ? state.map((el) => {
          const constr = this.componentLibrary[el.name];

          if (!constr) throw new DOMException(`Unknown component: ${el.name}`);

          const component: Component = new constr();
          el.attrs.push({ name: this.scopeIdentifier, value: '' });

          component.setAttrs(el.attrs);
          component.setProps(this.buildProps(el.props));
          component.appendChildren(this.buildTree(el.children));
          component.setContent(el.content);
          component.setKeySalt(this.identifiersSalt);
          component.setKey(el.key);
          component.setEventHandler((e, arr) => this.handler(e, arr));

          this.state[component.key] = component;

          return component;
        })
      : [];
  }

  public run() {
    this.root = this.buildTree(this.initState);

    this.rootHTML.innerHTML = '';
    this.root.forEach((el) => {
      this.rootHTML.appendChild(el.render());
    });
  }

  public find(key: string): Component | undefined {
    return this.state[key];
  }

  public update(key: string, content: string) {
    const element = this.find(key);
    if (element) {
      element.setContent(content);
      element.update();
    } else throw new DOMException('Element not found');
  }

  public subscribe(event, handler) {
    this.subs[event].push(handler);
  }

  public handler(eventType, elements) {
    if (Object.keys(this.subs).includes(eventType)) {
      console.log(elements);
      console.log(this.subs[eventType]);
      this.subs[eventType].forEach((el) => {
        console.log(el);
        el(elements);
      });
    }
  }
}
