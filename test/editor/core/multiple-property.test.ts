import { beforeEach, describe, expect, it, vi } from 'vitest';
import Attribute from '@/editor/core/attribute/Attribute.ts';
import MultipleProperty from '@/editor/core/property/MultipleProperty.ts';
import { App } from '@/editor/App.ts';
import Component, {
  ComponentObject,
} from '@/editor/core/component/Component.ts';

class TestComponent extends Component {
  name: string = 'TestComponent';
  htmlElement = document.createElement('div');
}

class MulProp extends MultipleProperty {
  static name: string = 'mul-name';

  public values = ['start', 'end'];
  availableValues: Record<string, any> = {
    start: 'mul-name-start',
    end: 'mul-name-end',
  };

  getName(): string {
    return MulProp.name;
  }
}

describe('Base property class tests', () => {
  const propertyValue1 = 'prop-val-1';
  const propertyValue2 = 'prop-val-2';

  let property: MultipleProperty;
  beforeEach(() => {
    //@ts-ignore
    property = new MultipleProperty([propertyValue1, propertyValue2]);
  });
  it('Test property creation', () => {
    expect(property.values).toStrictEqual([propertyValue1, propertyValue2]);
  });

  it('Test props applying', () => {
    const targetMock = {
      attributes: {
        append: vi.fn(),
      },
    };

    const propertyClassValue1 = 'test-class-1';
    const propertyClassValue2 = 'test-class-2';
    property.availableValues = {
      [propertyValue1]: propertyClassValue1,
      [propertyValue2]: propertyClassValue2,
    };
    //@ts-ignore
    property.apply(targetMock);

    expect(targetMock.attributes.append).toBeCalledTimes(2);
    expect(targetMock.attributes.append).toBeCalledWith(
      new Attribute('class', propertyClassValue1),
    );
    expect(targetMock.attributes.append).toBeCalledWith(
      new Attribute('class', propertyClassValue2),
    );
  });

  it('Test on success mount', () => {
    const app = new App();
    const mountPoint = 'app-root';
    const identifierSalt = 'salt';
    const state: ComponentObject[] = [
      {
        key: 'data-123',
        name: 'testComponent',
        attrs: [],
        props: [
          {
            name: 'mul-name',
            value: 'start',
          },
          {
            name: 'mul-name',
            value: 'end',
          },
        ],
        content: 'test content',
        children: [],
      },
    ];

    document.body.innerHTML = `<div data-scope id="${mountPoint}" ></div>`;
    app.useProp(MulProp);
    app.use('testComponent', TestComponent);
    app.init(mountPoint, identifierSalt, state);
    app.mount();

    const el = document.getElementById('app-root').children[0] as HTMLElement;
    expect(el.attributes.item(2).name).toBe('class');
    expect(el.attributes.item(2).value).toBe(' mul-name-start mul-name-end');
  });
});
