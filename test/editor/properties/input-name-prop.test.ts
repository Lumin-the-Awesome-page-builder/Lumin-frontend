import { describe, expect, beforeEach, it } from 'vitest';
import InputNameProp from '@/editor/properties/InputNameProp.ts';

describe('InputNameProp test', () => {
  let mockComponent;

  beforeEach(() => {
    mockComponent = {
      htmlElement: document.createElement('input'),
      specific: {},
    };
  });

  it('Correct class creation', () => {
    const inputNameProp = new InputNameProp(['input-name'], mockComponent);

    expect(inputNameProp.value).toStrictEqual(['input-name']);
    expect(inputNameProp.defaultValue).toStrictEqual(['input-name']);
    expect(inputNameProp.availableValues).toStrictEqual([
      { 'input-name': 'input-name' },
    ]);
    expect(InputNameProp.name).toBe('input-name');
  });

  it('Correct name getter', () => {
    const inputNameProp = new InputNameProp(['input-name'], mockComponent);

    expect(inputNameProp.getName()).toBe('input-name');
  });

  it('Apply method sets component name correctly', () => {
    const inputNameProp = new InputNameProp(['input-name'], mockComponent);

    inputNameProp.apply();

    expect(mockComponent.htmlElement.name).toBe('input-name');
    expect(mockComponent.specific.name).toBe('input-name');
  });

  it('Clear method resets component name to default', () => {
    const inputNameProp = new InputNameProp(['custom-name'], mockComponent);

    inputNameProp.apply();
    inputNameProp.clear();

    expect(mockComponent.htmlElement.name).toBe('input-name');
    expect(mockComponent.specific.name).toBe('input-name');
  });
});
