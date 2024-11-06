import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '@/editor/App.ts';
import Packager from '@/editor/core/Packager.ts';
import Container from '@/editor/components/Container.ts';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';

describe('Package class tests', () => {
  let app: App;
  let packager: Packager;
  const tree = {
    'data-123-div-1729624518542': {
      name: 'container',
      key: 'data-123-div-1729624518542',
      attrs: [],
      props: [{ name: 'flex', value: ['flex'] }],
      children: {
        'data-123-div-1729624518123': {
          name: 'container',
          key: 'data-123-div-1729624518123',
          attrs: [],
          props: [{ name: 'flex', value: ['flex'] }],
          children: [],
          content: 'Test content',
          specific: {},
          pure: false,
        },
        'data-123-div-1729624518545': {
          name: 'container',
          key: 'data-123-div-1729624518545',
          attrs: [],
          props: [{ name: 'flex', value: ['flex'] }],
          children: [],
          content: 'Test content',
          specific: {},
          pure: false,
        },
        'data-123-div-1729624518547': {
          name: 'container',
          key: 'data-123-div-1729624518547',
          attrs: [],
          props: [{ name: 'flex', value: ['flex'] }],
          children: [],
          content: '',
          specific: {},
          pure: false,
        },
      },
      content: null,
      specific: {},
      pure: false,
    },
  };
  const mountPoint = 'mountPoint';

  beforeEach(() => {
    const mountPointMock = document.createElement('div');
    mountPointMock.id = mountPoint;
    document.body.appendChild(mountPointMock);
    app = new App();
    app.use('container', Container);
    app.useProp(AlignItemsProp);
    app.useProp(AlignContentProp);
    app.useProp(ColWidthProp);
    app.useProp(FlexDirectionProp);
    app.useProp(FlexProp);
    app.useProp(FlexWrapProp);
    app.useProp(GutterProp);
    app.useProp(JustifyContentProp);
    app.init(mountPoint, '123', {...tree});
    app.mount();
    packager = new Packager(app);
  });

  it('Test json pack', () => {
    const json = packager.json();

    expect(JSON.parse(json)).toStrictEqual(tree);
  });

  describe('Test blob pack', () => {
    const appendChildMock = vi.fn();
    const createElementMock = vi.fn(() => ({
      appendChild: appendChildMock,
      getElementById: vi.fn(() => document.getElementById(mountPoint)),
      setAttribute: vi.fn(),
      addEventListener: vi.fn(),
      classList: {
        add: vi.fn()
      }
    }));

    beforeEach(() => {
      vi.stubGlobal('document', {
        createElement: createElementMock,
      });
    });

    it('Test blob pack', () => {
      packager.blob();

      expect(createElementMock).toBeCalledTimes(12);
      expect(createElementMock).toBeCalledWith('html');
      expect(createElementMock).toBeCalledWith('head');
      expect(createElementMock).toBeCalledWith('link');
      expect(createElementMock).toBeCalledWith('body');
    });
  });
});
