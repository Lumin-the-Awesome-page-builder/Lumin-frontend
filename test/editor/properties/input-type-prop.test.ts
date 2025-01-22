import { describe, expect, beforeEach, it } from 'vitest';
import InputTypeProp from '@/editor/properties/InputTypeProp.ts';

describe('InputTypeProp test', () => {
  let mockComponent;

  beforeEach(() => {
    mockComponent = {
      htmlElement: document.createElement('input'),
      specific: {},
    };
  });

  it('Correct class creation', () => {
    const inputTypeProp = new InputTypeProp(['text', 'button'], mockComponent);

    expect(inputTypeProp.value).toStrictEqual(['text', 'button']);
    expect(inputTypeProp.defaultValue).toStrictEqual(['text', 'button']);
    expect(inputTypeProp.availableValues).toStrictEqual([
      {
        text: 'text',
        email: 'email',
        date: 'date',
        button: 'button',
      },
      {
        button: 'button',
      },
    ]);
    expect(InputTypeProp.name).toBe('input-type');
  });

  it('Correct name getter', () => {
    const inputTypeProp = new InputTypeProp(['text', 'button'], mockComponent);

    expect(inputTypeProp.getName()).toBe('input-type');
  });

  it('Apply method sets component type and text correctly', () => {
    const inputTypeProp = new InputTypeProp(
      ['button', 'Submit'],
      mockComponent,
    );

    inputTypeProp.apply();

    expect(mockComponent.htmlElement.type).toBe('button');
    expect(mockComponent.htmlElement.value).toBe('Submit');
    expect(mockComponent.specific.type).toBe('button');
    expect(mockComponent.specific.text).toBe('Submit');
  });

  it('Apply method sets default text when no text is provided for button', () => {
    const inputTypeProp = new InputTypeProp(['button', ''], mockComponent);

    inputTypeProp.apply();

    expect(mockComponent.htmlElement.type).toBe('button'); // Проверяем тип
    expect(mockComponent.htmlElement.value).toBe('button'); // Проверяем значение по умолчанию
    expect(mockComponent.specific.type).toBe('button'); // Проверяем специфическое значение
    expect(mockComponent.specific.text).toBe(''); // Проверяем текст
  });

  it('Clear method resets component type and value to default', () => {
    const inputTypeProp = new InputTypeProp(['email', 'Send'], mockComponent);

    inputTypeProp.apply();
    inputTypeProp.clear();

    expect(mockComponent.htmlElement.type).toBe('text');
    expect(mockComponent.htmlElement.value).toBe('');
    expect(mockComponent.specific.type).toBe('text');
  });
});
