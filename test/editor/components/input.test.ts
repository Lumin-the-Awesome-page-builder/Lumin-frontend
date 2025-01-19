import { describe, expect, it, vi } from 'vitest';
import Input from '@/editor/components/Input.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';
import InputTypeProp from '@/editor/properties/InputTypeProp.ts';
import InputNameProp from '@/editor/properties/InputNameProp.ts';
import FontProp from '@/editor/properties/text/FontProp.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';

describe('Test Input component', () => {
  it('Test component creation', () => {
    const input = new Input('test-input');

    expect(input.name).toBe('input');
    expect(input.htmlElement.tagName).toBe('INPUT');
  });

  it('Test available component props', () => {
    const input = new Input('');
    expect(input.availableProps).toStrictEqual([
      ComponentNameProp.name,
      InputTypeProp.name,
      InputNameProp.name,
      FontProp.name,
      InlineTextProp.name,
      LeadParagraphProp.name,
      MonoSpaceProp.name,
      TextAlignProp.name,
      TextTransformProp.name,
    ]);
  });

  it('Test getTitle method', () => {
    const input = new Input('');
    expect(input.getTitle()).toBe('Инпут');
  });

  it('Test constructor logs argument', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    new Input('test-input');
    expect(consoleSpy).toHaveBeenCalledWith('test-input');
    consoleSpy.mockRestore();
  });

  it('Test setting and getting content', () => {
    const input = new Input('');
    input.setContent('Sample content');
    expect(input.content).toBe('Sample content');
  });
});
