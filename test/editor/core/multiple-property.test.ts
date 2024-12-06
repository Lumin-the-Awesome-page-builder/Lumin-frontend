import { beforeEach, describe, expect, it, vi } from 'vitest';
import MultipleProperty from '@/editor/core/property/MultipleProperty.ts';
import { App } from '@/editor/App.ts';
import { ComponentObject } from '@/editor/core/component/Component.ts';
import Container from '@/editor/components/Container.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';

describe('Base property class tests', () => {
  const targetMock = {
    attributes: {
      append: vi.fn(),
    },
  };
  const propertyValue1 = 'prop-val-1';
  const propertyValue2 = 'prop-val-2';

  const propertyClassValue1 = 'test-class-1';
  const propertyClassValue2 = 'test-class-2';

  let property: MultipleProperty;
  beforeEach(() => {
    //@ts-ignore
    property = new MultipleProperty(
      [[propertyValue1, propertyValue2]],
      targetMock,
    );
  });
  it('Test property creation', () => {
    expect(property.values).toStrictEqual([[propertyValue1, propertyValue2]]);
  });

  it('Test props applying', () => {
    property.availableValues = [
      {
        [propertyValue1]: propertyClassValue1,
        [propertyValue2]: propertyClassValue2,
      },
    ];
    targetMock.htmlElement = { classList: { add: vi.fn() } };
    //@ts-ignore
    property.apply();

    expect(targetMock.htmlElement.classList.add).toBeCalledTimes(2);
    expect(targetMock.htmlElement.classList.add).toBeCalledWith('test-class-1');
    expect(targetMock.htmlElement.classList.add).toBeCalledWith('test-class-2');
  });

  it('Test on success mount', () => {
    const app = new App();
    const mountPoint = 'app-root';
    const state: ComponentObject[] = [
      {
        key: 'data-123',
        name: 'container',
        attrs: [],
        props: [{ name: 'flex', value: ['flex'] }],
        content: 'test content',
        children: [],
      },
    ];

    document.body.innerHTML = `<div data-scope id="${mountPoint}" ></div>`;
    app.use('container', Container);
    app.useProp(FlexProp);
    app.useProp(AlignItemsProp);
    app.useProp(AlignContentProp);
    app.useProp(ColWidthProp);
    app.useProp(FlexDirectionProp);
    app.useProp(FlexWrapProp);
    app.useProp(GutterProp);
    app.useProp(JustifyContentProp);
    app.useProp(ComponentNameProp);
    app.init(mountPoint, '123', [...state]);
    app.mount();

    const el = document.getElementById('app-root').children[0] as HTMLElement;
    expect(el.attributes.item(2).name).toBe('data-123');
  });

  it('Test props removing', () => {
    targetMock.htmlElement = { classList: { remove: vi.fn() } };
    property.availableValues = [
      {
        [propertyValue1]: propertyClassValue1,
        [propertyValue2]: propertyClassValue2,
      },
    ];
    property.clear();

    expect(targetMock.htmlElement.classList.remove).toBeCalledTimes(2);
    expect(targetMock.htmlElement.classList.remove).toBeCalledWith(
      'test-class-1',
    );
    expect(targetMock.htmlElement.classList.remove).toBeCalledWith(
      'test-class-2',
    );
  });
});
