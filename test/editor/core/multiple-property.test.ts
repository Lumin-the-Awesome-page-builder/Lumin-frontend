import { beforeEach, describe, expect, it, vi } from 'vitest';
import Attribute from '@/editor/core/attribute/Attribute.ts';
import MultipleProperty from '@/editor/core/property/MultipleProperty.ts';

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
});
