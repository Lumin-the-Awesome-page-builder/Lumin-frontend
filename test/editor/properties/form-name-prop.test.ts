import { describe, it, expect, beforeEach } from 'vitest';
import FormNameProp from '@/editor/properties/FormNameProp.ts';

describe('FormNameProp Test', () => {
  let mockComponent;
  let formNameProp;

  beforeEach(() => {
    mockComponent = {
      specific: {},
    };
    formNameProp = new FormNameProp(['form-name'], mockComponent);
  });

  it('Correct class creation', () => {
    expect(formNameProp.value).toStrictEqual(['form-name']);
    expect(formNameProp.defaultValue).toStrictEqual(['form-name']);
    expect(formNameProp.availableValues).toStrictEqual([
      { 'form-name': 'form-name' },
    ]);
    expect(FormNameProp.name).toBe('form-name');
  });

  it('Correct name getter', () => {
    expect(formNameProp.getName()).toBe('form-name');
  });

  it('Apply method sets component specific properties correctly', () => {
    formNameProp.apply();

    expect(mockComponent.specific.name).toBe('form-name');
  });

  it('Clear method resets component specific properties to default values', () => {
    formNameProp.apply();
    formNameProp.clear();

    expect(mockComponent.specific.name).toBe('form-name');
  });
});
