import { beforeEach, describe, expect, it, vi } from 'vitest';
import Property from '@/editor/core/property/Property.ts';

describe('Base property class tests', () => {
  const targetMock = {};
  const propertyValue = ['prop-val'];
  let property: Property;
  beforeEach(() => {
    //@ts-ignore
    property = new Property(propertyValue, targetMock);
  });
  it('Test property creation', () => {
    expect(property.value).toBe(propertyValue);
  });

  it('Test prop applying', () => {
    const propertyClassValue = 'test-class';
    property.availableValues = [
      {
        [propertyValue]: propertyClassValue,
      },
    ];
    targetMock.htmlElement = { classList: { add: vi.fn() } };
    //@ts-ignore
    property.apply();

    expect(targetMock.htmlElement.classList.add).toBeCalledTimes(1);
    expect(targetMock.htmlElement.classList.add).toBeCalledWith('test-class');
  });
});
