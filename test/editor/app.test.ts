import { assert, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { App } from '@/editor/App.ts';
import Component, {
  ComponentObject,
} from '@/editor/core/component/Component.ts';
import Property, { PropertyObject } from '@/editor/core/property/Property.ts';

const spies = {
  setAttrs: vi.fn(),
  setProps: vi.fn(),
  appendChildren: vi.fn(),
  setKeySalt: vi.fn(),
  setKey: vi.fn(),
  setContent: vi.fn(),
  update: vi.fn(),
  setEventHandler: vi.fn(),
};

function MockComponentClass() {
  this.constructor = function () {
    return this;
  };
  Object.keys(spies).forEach((el) => (this[el] = spies[el]));
}

//@ts-ignore
class MockComponent extends Component {
  render = vi.fn(() => {
    const element = document.createElement('div');
    element.setAttribute('data-key', this.key);
    return element;
  });
  setAttrs = vi.fn();
  setProps = vi.fn();
  appendChildren = vi.fn();
  setKeySalt = vi.fn();
  setKey = vi.fn();
  setContent = vi.fn();
  update = vi.fn();
  setEventHandler = vi.fn();
  replaceChild = vi.fn();
  removeChild = vi.fn();
  updateChild = vi.fn();
}

//@ts-ignore
class MockProperty extends Property {
  constructor(value: any) {
    super(value);
  }
}

describe('App.ts unit tests', () => {
  let app: App;

  beforeEach(() => {
    setActivePinia(createPinia());
    app = new App();
  });

  describe('init', () => {
    it('initializes with the correct values', () => {
      const mountPoint = 'app-root';
      const identifierSalt = 'salt';
      const state: ComponentObject[] = [];
      document.body.innerHTML = `<div data-scope id="${mountPoint}" ></div>`;

      app.init(mountPoint, identifierSalt, state);

      expect(app.mountPoint).toBe(mountPoint);
      expect(app.identifiersSalt).toBe(identifierSalt);
      expect(app.initState).toBe(state);
      expect(app.rootHTML).toBe(document.getElementById(mountPoint));
      expect(app.scopeIdentifier).toBe('data-scope');
    });

    it('wrong mountPoint provided', async () => {
      expect(() => app.init('missing-root', 'salt')).toThrow(
        'Bad root element provided',
      );
    });
  });

  it('componentLibrary', () => {
    app.use('mock', MockComponent);
    expect(app.componentLibrary['mock']).toBe(MockComponent);
  });

  it('propLibrary', () => {
    app.useProp(MockProperty);
    expect(app.propLibrary['MockProperty']).toBe(MockProperty);
  });

  describe('buildProps', () => {
    it('Success build props', () => {
      const propData: PropertyObject[] = [
        {
          name: 'MockProperty',
          value: 'test-value-1',
        },
        {
          name: 'MockProperty',
          value: 'test-value-2',
        },
      ];
      app.useProp(MockProperty);

      const props = app.buildProps(propData);

      expect(props).toHaveLength(2);
      expect(props[0]).toBeInstanceOf(MockProperty);
      expect(props[0].value).toBe('test-value-1');

      expect(props[1]).toBeInstanceOf(MockProperty);
      expect(props[1].value).toBe('test-value-2');
    });
    it('Wrong property name provided', () => {
      const propName = 'WrongPropertyName';
      const propData: PropertyObject[] = [
        {
          name: propName,
          value: 'wrong-prop-value',
        },
      ];

      app.useProp(MockProperty);

      expect(() => app.buildProps(propData)).toThrow(
        `Unknown property: ${propName}`,
      );
    });
  });

  describe('buildTree', () => {
    it('success creation', () => {
      const component = MockComponentClass;
      const mountPoint = 'app-root';
      document.body.innerHTML = `<div id="${mountPoint}" data-scope></div>`;
      app.init(mountPoint, 'salt');
      app.useProp(MockProperty);
      const state: ComponentObject[] = [
        //@ts-ignore
        {
          key: 'data-123',
          name: 'mock',
          attrs: [],
          props: [
            {
              name: 'MockProperty',
              value: 'test-value-1',
            },
          ],
          content: 'test content',
          children: [],
        },
      ];
      //@ts-ignore
      app.use('mock', component);

      const tree = app.buildTree(state);
      expect(tree).toHaveLength(1);
      expect(tree[0]).toBeInstanceOf(MockComponentClass);
      expect(spies.setAttrs).toHaveBeenCalledWith([
        {
          name: 'id',
          value: '',
        },
      ]);

      expect(spies.setProps).toHaveBeenCalledWith([
        {
          value: 'test-value-1',
        },
      ]);
      expect(spies.appendChildren).toHaveBeenCalledWith([]);
      expect(spies.setContent).toHaveBeenCalledWith('test content');

      expect(spies.setKeySalt).toHaveBeenCalledWith('salt');
      expect(spies.setKey).toHaveBeenCalledWith('data-123');
    });

    it('Component does not exist', () => {
      const componentName = 'unknown';

      const state: ComponentObject[] = [
        //@ts-ignore
        {
          key: 'data-123',
          name: componentName,
          attrs: [],
          props: [],
          content: 'test content',
          children: [],
        },
      ];

      expect(() => app.buildTree(state)).toThrow(
        `Unknown component: ${componentName}`,
      );
    });

    it('provided state as state', () => {
      expect(app.buildTree(null)).toStrictEqual([]);
    });
  });

  it('run', () => {
    const mountPoint = 'app-root';
    document.body.innerHTML = `<div id="${mountPoint}" data-scope></div>`;
    const initState = JSON.stringify([
      {
        key: 'data-123',
        name: 'mock',
        attrs: [],
        props: [
          {
            name: 'MockProperty',
            value: 'test-value-1',
          },
        ],
        content: 'test content',
        children: [],
      },
    ]);
    app.init(mountPoint, 'salt', JSON.parse(initState));
    app.useProp(MockProperty);
    app.use('mock', MockComponent);

    app.mount();
    app.root.forEach((el: any) => {
      expect(el.render).toHaveBeenCalledWith();
    });
  });

  it('find', () => {
    //@ts-ignore
    const component = new MockComponent();
    component.key = 'test-key';
    app.state['test-key'] = component;

    const result = app.find('test-key');
    expect(result).toBe(component);
  });

  describe('Test update method', () => {
    let component: MockComponent;
    let parentComponent: MockComponent;
    beforeEach(() => {
      parentComponent = new MockComponent('div');
      parentComponent.generateKey();
      component = new MockComponent('h1');
      component.generateKey();

      app.state[parentComponent.key] = parentComponent;
      app.state[component.key] = component;
    });
    it('Update parent exists', () => {
      parentComponent.children.push(component);
      component.parent = parentComponent;

      app.update(component);

      expect(parentComponent.replaceChild).toBeCalledTimes(1);
      expect(parentComponent.replaceChild).toBeCalledWith(component);
      expect(parentComponent.render).toBeCalled();
    });

    it('Update without parent', () => {
      app.update(component);

      expect(component.render).toBeCalled();
    });
  });

  describe('Test add method', () => {
    it('Test unknown component', () => {
      app.componentLibrary = {};

      assert.throws(() => app.add('test', 'test'));
    });
    describe('', () => {
      let mock;
      let Mock: any;
      beforeEach(() => {
        mock = {
          setAttrs: vi.fn(),
          setEventHandler: vi.fn(),
          setKeySalt: vi.fn(),
          generateKey: vi.fn(),
          appendChild: vi.fn(),
          render: vi.fn(),
        };
        Mock = function () {
          Object.keys(mock).forEach((el) => (this[el] = mock[el]));
          this.constructor = function () {
            return this;
          };
        };
      });
      it('Test unknown parent', () => {
        const scopeIdentifier = 'test';
        app.scopeIdentifier = scopeIdentifier;
        app.componentLibrary['test'] = Mock;

        assert.throws(() => app.add('test', 'test'));
      });

      it('Test success addition', () => {
        const scopeIdentifier = 'test';
        app.scopeIdentifier = scopeIdentifier;
        app.componentLibrary['test'] = Mock;
        app.state['test'] = new Mock();

        app.add('test', 'test');

        expect(mock.setAttrs).toBeCalledTimes(1);
        expect(mock.setEventHandler).toBeCalledTimes(1);
        expect(mock.setKeySalt).toBeCalledTimes(1);
        expect(mock.generateKey).toBeCalledTimes(1);
        expect(mock.appendChild).toBeCalledTimes(1);
        expect(mock.render).toBeCalledTimes(1);
      });
    });
  });

  describe('Test remove method', () => {
    it('Test unknown component', () => {
      app.state = {};

      assert.throws(() => app.remove('test'));
    });
    describe('', () => {
      let querySelectorMock: any;
      beforeEach(() => {
        querySelectorMock = vi.fn(() => ({ remove: vi.fn() }));
        vi.stubGlobal('document', {
          querySelector: querySelectorMock,
          createElement: vi.fn(),
        });
      });

      it('Test remove without parent', () => {
        //@ts-ignore
        const component = new MockComponent();
        component.parent = null;
        component.key = 'key';
        app.state['test'] = component;

        console.log(app);

        app.remove('test');

        expect(Object.keys(app.state).length).toBe(0);
        expect(querySelectorMock).toBeCalledTimes(1);
        expect(querySelectorMock).toBeCalledWith(`[${component.key}]`);
      });

      it('Test remove with parent', () => {
        //@ts-ignore
        const component = new MockComponent();
        //@ts-ignore
        component.parent = new MockComponent();
        component.parent.render = vi.fn();
        component.key = 'key';
        app.state['test'] = component;

        app.remove('test');

        expect(component.parent.removeChild).toBeCalledTimes(1);
        expect(component.parent.removeChild).toBeCalledWith('test');
        expect(component.parent.render).toBeCalledTimes(1);
        expect(Object.keys(app.state).length).toBe(0);
      });
    });
  });

  it('Test on set elements in handler', () => {
    //@ts-ignore
    const component = new Component('div');
    const expectSize = app.subs.click.length + 1;
    app.subs.click.push(() => {});
    app.handler('click', [component]);
    expect(app.subs.click.length).toBe(expectSize);
  });
});
