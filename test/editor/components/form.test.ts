import { describe, expect, it, vi } from 'vitest';
import Form from '@/editor/components/Form.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';
import FormNameProp from '@/editor/properties/FormNameProp.ts';
import FormManagementTypeProp from '@/editor/properties/FormManagementTypeProp.ts';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';

describe('Test Form component', () => {
  it('Test component creation', () => {
    const form = new Form('test-form');

    expect(form.name).toBe('form');
    expect(form.htmlElement.tagName).toBe('FORM');
  });

  it('Test available component props', () => {
    const form = new Form('');
    expect(form.availableProps).toStrictEqual([
      ComponentNameProp.name,
      FormNameProp.name,
      FormManagementTypeProp.name,
      AlignItemsProp.name,
      AlignContentProp.name,
      ColWidthProp.name,
      FlexDirectionProp.name,
      FlexProp.name,
      FlexWrapProp.name,
      GutterProp.name,
      JustifyContentProp.name,
    ]);
  });

  it('Test getTitle method', () => {
    const form = new Form('');
    expect(form.getTitle()).toBe('Форма');
  });

  it('Test constructor logs argument', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    new Form('test-form');
    expect(consoleSpy).toHaveBeenCalledWith('test-form');
    consoleSpy.mockRestore();
  });

  it('Test render method adds class when not pure', () => {
    const form = new Form('');
    const renderedElement = form.render();

    expect(renderedElement.classList.contains('editor-container-item')).toBe(
      true,
    );
  });
});
