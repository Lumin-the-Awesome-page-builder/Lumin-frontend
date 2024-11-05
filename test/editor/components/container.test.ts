import { describe, expect, it } from 'vitest';
import Container from '@/editor/components/Container.ts';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';

describe('Test container component', () => {
  it('Test component creation', () => {
    const container = new Container('');

    expect(container.elementName).toBe('div');
  });

  it('Test available component props', () => {
    const container = new Container('div');
    expect(container.availableProps).toStrictEqual([
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
});
