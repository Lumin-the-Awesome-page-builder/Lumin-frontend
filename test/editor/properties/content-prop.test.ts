import { describe, it, expect, beforeEach } from 'vitest';
import ContentProp from '@/editor/properties/ContentProp.ts';

describe('ContentProp Test', () => {
  let mockComponent;
  let contentProp;

  beforeEach(() => {
    mockComponent = {
      content: '',
      htmlElement: {
        innerText: '',
      },
    };
    contentProp = new ContentProp(['Текст...'], mockComponent);
  });

  it('Correct class creation', () => {
    expect(contentProp.value).toStrictEqual(['Текст...']);
    expect(contentProp.defaultValue).toStrictEqual(['Текст...']);
    expect(contentProp.availableValues).toStrictEqual([]);
    expect(ContentProp.name).toBe('content');
  });

  it('Correct name getter', () => {
    expect(contentProp.getName()).toBe('content');
  });

  it('setValue method updates value and applies changes', () => {
    contentProp.setValue(['Новый текст']);

    expect(contentProp.value[0]).toBe('Новый текст');
    expect(mockComponent.content).toBe('Новый текст');
    expect(mockComponent.htmlElement.innerText).toBe('Новый текст');
  });

  it('apply method sets component properties correctly', () => {
    contentProp.setValue(['Текст для применения']);

    contentProp.apply();

    expect(mockComponent.content).toBe('Текст для применения');
    expect(mockComponent.htmlElement.innerText).toBe('Текст для применения');
  });

  it('clear method resets component properties to default values', () => {
    contentProp.setValue(['Текст для очистки']);
    contentProp.clear();

    expect(mockComponent.content).toBe('');
    expect(mockComponent.htmlElement.innerText).toBe('');
  });
});
