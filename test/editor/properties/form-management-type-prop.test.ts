import { describe, it, expect, beforeEach } from 'vitest';
import FormManagementTypeProp from '@/editor/properties/FormManagementTypeProp.ts';

describe('FormManagementTypeProp Test', () => {
  let mockComponent;
  let formManagementTypeProp;

  beforeEach(() => {
    mockComponent = {
      specific: {},
    };
    formManagementTypeProp = new FormManagementTypeProp(
      ['self', 'https://example.com/save', 'https://example.com/get'],
      mockComponent,
    );
  });

  it('Correct class creation', () => {
    expect(formManagementTypeProp.value).toStrictEqual([
      'self',
      'https://example.com/save',
      'https://example.com/get',
    ]);
    expect(formManagementTypeProp.defaultValue).toStrictEqual([
      'self',
      'https://example.com/save',
      'https://example.com/get',
    ]);
    expect(formManagementTypeProp.availableValues).toStrictEqual([
      { self: 'self', service: 'service' },
      { 'https://example.com/save': 'https://example.com/save' },
      { 'https://example.com/get': 'https://example.com/get' },
    ]);
    expect(FormManagementTypeProp.name).toBe('form-management-type');
  });

  it('Correct name getter', () => {
    expect(formManagementTypeProp.getName()).toBe('form-management-type');
  });

  it('Apply method sets component specific properties correctly', () => {
    formManagementTypeProp.apply();

    expect(mockComponent.specific.handler).toBe('self');
    expect(mockComponent.specific.save_url).toBe('https://example.com/save');
    expect(mockComponent.specific.get_url).toBe('https://example.com/get');
  });

  it('Clear method resets component specific properties to default values', () => {
    formManagementTypeProp.apply();
    formManagementTypeProp.clear();

    expect(mockComponent.specific.handler).toBe('self');
    expect(mockComponent.specific.save_url).toBe('https://example.com/save');
    expect(mockComponent.specific.get_url).toBe('https://example.com/get');
  });
});
