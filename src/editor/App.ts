import Component, {
  ComponentObject,
} from '@/editor/core/component/Component.ts';
import Property, { PropertyObject } from '@/editor/core/property/Property.ts';

export class App {
  public rootHTML: HTMLElement = document.createElement('div');
  public root: Record<string, Component> = {};
  public rootOrdering: string[] = [];
  public state: Record<string, Component> = {};
  public componentLibrary: Record<string, any> = {};
  public propLibrary: Record<string, any> = {};
  public mountPoint: string = '';
  public identifiersSalt: string = '';
  public scopeIdentifier: string = '';
  public initState: Record<string, ComponentObject> = {};
  public pureStyles: Record<string, HTMLElement> = {};
  public wasBuilt = false;

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

    if (maybeStyle && maybeStyle.nodeName == 'STYLE') {
      return [doc.body.firstChild as HTMLElement, maybeStyle as HTMLElement];
    } else {
      return [doc.body.firstChild as HTMLElement];
    }
  }

  public buildPure(component: Component) {
    const parsed = this.parsePure(component.specific.html);
    component.specific.htmlOnRender = parsed[0];
    if (parsed.length > 1) {
      this.pureStyles[component.key] = parsed[1];
    }
    component.pure = true;
    this.mountPureStyles();
  }

  public buildTree(
    state: Record<string, ComponentObject>,
    refreshKeys: boolean = false,
    stackSize: number = 0,
  ): Record<string, Component> {
    if (state) {
      let items = Object.keys(state);
      if (items.includes('setup')) {
        this.rootOrdering = state.setup.rootOrdering;
        delete state['setup'];
        items = this.rootOrdering;
      }

      const tree = items.map((key, index) => {
        const el = state[key];
        const constr = this.componentLibrary[el.name];

        if (!constr) throw new DOMException(`Unknown component: ${el.name}`);

        const component: Component = new constr();
        component.pure = !!el.pure;
        component.specific = { ...el.specific };

        const attrs = [...el.attrs];
        attrs.push({ name: this.scopeIdentifier, value: '' });

        component.scopeIdentifier = this.scopeIdentifier;
        component.setAttrs(attrs);
        component.setProps(this.buildProps(component, el.props));
        console.log(el);
        component.appendChildren(
          this.buildTree(el.children, refreshKeys, stackSize++),
          el.childrenOrdering,
        );
        component.setContent(el.content);
        component.setKeySalt(this.identifiersSalt);
        if (refreshKeys) {
          component.generateKey(`-${stackSize}-${index}`);
          component.oldKey = el.key;
        } else component.setKey(el.key);
        if (component.parent) {
        }
        component.setEventHandler((e, arr, domEvent) =>
          this.handler(e, arr, domEvent),
        );

        if (component.specific.html && component.pure) {
          this.buildPure(component);
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

    this.wasBuilt = true;

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

  public handler(eventType, elements, domEvent) {
    if (Object.keys(this.subs).includes(eventType)) {
      this.subs[eventType].forEach((el) => {
        el(elements, domEvent);
      });
    }
  }

  public attachToParent(
    component: Component,
    parentKey: string,
    placeBefore: string | null = null,
  ) {
    if (parentKey) {
      const parent = this.state[parentKey];
      if (!parent) {
        throw new DOMException('Bad parent provided');
      }

      parent.appendChild(component, placeBefore);
      parent.render();
    } else {
      this.rootOrdering.push(component.key);
      this.root[component.key] = component;
      console.log(this.root, this.rootOrdering);
      if (placeBefore == 'last' || !placeBefore)
        this.rootHTML.appendChild(component.render());
      else {
        const beforeElement = this.root[placeBefore].htmlElement;
        this.rootHTML.insertBefore(component.render(), beforeElement);
      }
    }
  }

  public add(
    name: string,
    parentKey: string,
    placeBefore: string | null = null,
  ) {
    const constr = this.componentLibrary[name];
    if (!constr) throw new DOMException(`Unknown component: ${name}`);
    const component = new constr();
    const attrs = [{ name: this.scopeIdentifier, value: '' }];

    if (name == 'pure') {
      const html = '<div>Pure component</div>';
      component.specific = { html };
      this.buildPure(component);
    }

    component.setAttrs(attrs);
    component.setEventHandler((e, arr, ev) => this.handler(e, arr, ev));
    component.setKeySalt(this.identifiersSalt);
    component.generateKey();
    component.setProps(this.buildProps(component, []));

    this.attachToParent(component, parentKey, placeBefore);

    this.state[component.key] = component;

    return component;
  }

  public addWidget(
    widgetJson: string,
    parentKey: string,
    placeBefore: string | null = null,
  ) {
    const parsed = JSON.parse(widgetJson);
    const widgetTree = this.buildTree({ [parsed.key]: parsed }, true);
    const widget = widgetTree[Object.keys(widgetTree)[0]];

    this.attachToParent(widget, parentKey, placeBefore);

    return widget;
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
      return component.parent;
    } else {
      document.querySelector(`[${component.key}]`).remove();
      delete this.root[key];
      this.rootOrdering = this.rootOrdering.filter((el) => el !== key);
      return null;
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

  public replacePure(component: Component) {
    if (this.pureStyles[component.key]) {
      this.pureStyles[component.key].remove();
      delete this.pureStyles[component.key];
    }
    const old = this.root[component.key].specific.htmlOnRender;
    this.buildPure(component);
    old.replaceWith(component.render());
    this.root[component.key] = component;
  }

  public moveInArr(arr: string[], key: string, left: boolean) {
    const curIndex = arr.indexOf(key);

    if ((left && curIndex == 0) || (!left && curIndex + 1 == arr.length))
      return null;

    const first = arr.slice(0, curIndex - Number(left));
    const last = arr.slice(
      curIndex + Number(left) + Number(!left) * 2,
      arr.length,
    );
    const resultArr = left
      ? [...first, key, arr[curIndex - 1], ...last]
      : [...first, arr[curIndex + 1], key, ...last];

    return [resultArr, left ? arr[curIndex - 1] : arr[curIndex + 1]];
  }

  public move(component: Component, left: boolean) {
    if (!this.state[component.key])
      throw new DOMException(`Unknown component: ${component.key}`);

    const parent = component.parent;
    console.log(parent);
    const html = component.pure
      ? component.specific.htmlOnRender
      : component.htmlElement;

    if (!parent) {
      const move = this.moveInArr(this.rootOrdering, component.key, left);

      if (!move) return;

      const insertBeforeElement = this.state[move[1]];

      if (!insertBeforeElement) return;

      if (left) {
        html.remove();
        this.rootHTML.insertBefore(html, insertBeforeElement.htmlElement);
      } else {
        insertBeforeElement.htmlElement.remove();
        this.rootHTML.insertBefore(insertBeforeElement.htmlElement, html);
      }
      this.rootOrdering = [...move[0]];
    } else {
      const move = this.moveInArr(parent.childrenOrdering, component.key, left);

      if (!move) return;

      const insertBeforeElement = this.state[move[1]];

      if (!insertBeforeElement) return;

      parent.childrenOrdering = [...move[0]];

      if (left) {
        html.remove();
        console.log(html, insertBeforeElement.htmlElement);
        parent.htmlElement.insertBefore(html, insertBeforeElement.htmlElement);
      } else {
        insertBeforeElement.htmlElement.remove();
        parent.htmlElement.insertBefore(insertBeforeElement.htmlElement, html);
      }
    }

    return parent;
  }
}
