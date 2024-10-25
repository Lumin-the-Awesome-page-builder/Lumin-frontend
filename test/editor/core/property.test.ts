import { beforeEach, describe, expect, it, vi } from 'vitest';
import Property from '@/editor/core/property/Property.ts';
import Attribute from '@/editor/core/attribute/Attribute.ts';

describe('Base property class tests', () => {
  const propertyValue = 'prop-val';
  let property: Property;
  beforeEach(() => {
    //@ts-ignore
    property = new Property(propertyValue);
  });
  it('Test property creation', () => {
    expect(property.value).toBe(propertyValue);
  });

  it('Test prop applying', () => {
    const targetMock = {
      attributes: {
        append: vi.fn(),
      },
    };

    const propertyClassValue = 'test-class';
    property.values = {
      [propertyValue]: propertyClassValue,
    };
    //@ts-ignore
    property.apply(targetMock);

    expect(targetMock.attributes.append).toBeCalledTimes(1);
    expect(targetMock.attributes.append).toBeCalledWith(
      new Attribute('class', propertyClassValue),
    );
  });
});
