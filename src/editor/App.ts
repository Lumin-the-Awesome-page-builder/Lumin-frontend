import Component, {
  ComponentObject,
} from '@/editor/core/component/Component.ts';
import Property, { PropertyObject } from '@/editor/core/property/Property.ts';

export class App {
  public rootHTML: HTMLElement = document.createElement('div');
  public root: Record<string, Component> = {};
  public state: Record<string, Component> = {};
  public componentLibrary: Record<string, any> = {};
  public propLibrary: Record<string, any> = {};
  public mountPoint: string = '';
  public identifiersSalt: string = '';
  public scopeIdentifier: string = '';
  public initState: Record<string, ComponentObject> = {};
  public pureStyles: Record<string, HTMLElement> = {};

  // "event": [([parents] => {},)]
  public subs = {
    click: [],
    dblclick: [],
    contextmenu: [],
  };

  init(
    mountPoint: string,
    identifierSalt: string,
    initState: Record<string, ComponentObject> = {},
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

  public buildProps(component: Component, props: PropertyObject[]): any[] {
    const names = props.map((el) => el.name);
    component.availableProps.forEach((el) => {
      if (!names.includes(el)) {
        const propConstructor = this.propLibrary[el];

        if (!propConstructor) throw new DOMException(`Unknown property: ${el}`);

        const value = new propConstructor([], component).defaultValue;

        props.push({
          name: el,
          value,
        });
      }
    });

    console.log(props);

    return props.map((prop) => {
      const propConstructor = this.propLibrary[prop.name];

      if (!propConstructor)
        throw new DOMException(`Unknown property: ${prop.name}`);

      return new propConstructor(prop.value, component);
    });
  }

  public mountPureStyles() {
    Object.values(this.pureStyles).forEach((el) => {
      document.head.appendChild(el);
    });
  }

  public parsePure(htmlStr: string): HTMLElement[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlStr, 'text/html');
    const maybeStyle = doc.head.firstChild;
    console.log(maybeStyle.nodeName);
    if (maybeStyle.nodeName == 'STYLE') {
      return [doc.body.firstChild as HTMLElement, maybeStyle as HTMLElement];
    } else {
      return [doc.body.firstChild as HTMLElement];
    }
  }

  public buildTree(
    state: Record<string, ComponentObject>,
  ): Record<string, Component> {
    if (state) {
      const tree = Object.keys(state).map((key) => {
        const el = state[key];
        const constr = this.componentLibrary[el.name];

        if (!constr) throw new DOMException(`Unknown component: ${el.name}`);

        const component: Component = new constr();
        const attrs = [...el.attrs];
        attrs.push({ name: this.scopeIdentifier, value: '' });

        component.scopeIdentifier = this.scopeIdentifier;
        component.setAttrs(attrs);
        component.setProps(this.buildProps(component, el.props));
        component.appendChildren(this.buildTree(el.children));
        component.setContent(el.content);
        component.setKeySalt(this.identifiersSalt);
        component.setKey(el.key);
        component.setEventHandler((e, arr) => this.handler(e, arr));
        component.pure = !!el.pure;
        component.specific = { ...el.specific };

        if (component.specific.html && component.pure) {
          const parsed = this.parsePure(component.specific.html);
          component.specific.htmlOnRender = parsed[0];
          if (parsed.length > 1) {
            this.pureStyles[component.key] = parsed[1];
          }
        }

        this.state[component.key] = component;

        return { [component.key]: component };
      });

      this.mountPureStyles();

      return tree.length
        ? tree.reduce((prev, cur) => Object.assign(prev, cur))
        : {};
    } else {
      return {};
    }
  }

  public mount() {
    this.root = this.buildTree(this.initState);

    this.rootHTML.innerHTML = '';
    Object.keys(this.root).forEach((key) => {
      this.rootHTML.appendChild(this.root[key].render());
    });
  }

  public find(key: string): Component | undefined {
    return this.state[key];
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

  public add(name: string, pure: string, parentKey: string) {
    const constr = this.componentLibrary[name];
    if (!constr) throw new DOMException(`Unknown component: ${name}`);
    const component = new constr();
    const attrs = [{ name: this.scopeIdentifier, value: '' }];
    component.setAttrs(attrs);
    component.setEventHandler((e, arr) => this.handler(e, arr));
    component.setKeySalt(this.identifiersSalt);
    component.generateKey();
    component.setProps(this.buildProps(component, []))

    const parent = this.state[parentKey];
    if (!parent) {
      throw new DOMException('Bad parent provided');
    }

    if (name == 'pure') {
      const parsed = this.parsePure(pure);
      component.specific.html = parsed[0];
      if (parsed.length > 1) {
        this.pureStyles[component.key] = parsed[1];
      }
    }

    this.state[component.key] = component;
    parent.appendChild(component);
    parent.render();
  }

  public remove(key: string) {
    const component = this.state[key];

    if (!component) throw new DOMException(`Unknown component: ${key}`);

    if (this.pureStyles[key]) {
      this.pureStyles[key].remove();
      delete this.pureStyles[key];
    }

    delete this.state[key];

    if (component.parent) {
      component.parent.removeChild(key);

      component.parent.render();
    } else {
      document.querySelector(`[${component.key}]`).remove();
    }
  }

  public update(component: Component) {
    this.state[component.key] = component;
    const parent = component.parent;

    if (parent) {
      parent.replaceChild(component);
      parent.render();
    } else {
      component.render();
    }
  }
}
