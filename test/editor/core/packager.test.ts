import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '@/editor/App.ts';
import Packager from '@/editor/core/Packager.ts';
import Container from '@/editor/components/Container.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';

describe('Package class tests', () => {
  let app: App;
  let packager: Packager;
  const tree = [
    {
      name: 'container',
      key: 'data-123-div-1729624518542',
      attrs: [],
      props: [{ name: 'flex', value: 'flex' }],
      children: [
        {
          name: 'container',
          key: 'data-123-div-1729624518123',
          attrs: [],
          props: [{ name: 'flex', value: 'flex' }],
          children: [],
          content: 'Test content',
          specific: {},
          pure: false,
        },
        {
          name: 'container',
          key: 'data-123-div-1729624518545',
          attrs: [],
          props: [{ name: 'flex', value: 'flex' }],
          children: [],
          content: 'Test content',
          specific: {},
          pure: false,
        },
        {
          name: 'container',
          key: 'data-123-div-1729624518547',
          attrs: [],
          props: [{ name: 'flex', value: 'flex' }],
          children: [],
          content: '',
          specific: {},
          pure: false,
        },
      ],
      content: null,
      specific: {},
      pure: false,
    },
  ];
  const mountPoint = 'mountPoint';

  beforeEach(() => {
    const mountPointMock = document.createElement('div');
    mountPointMock.id = mountPoint;
    document.body.appendChild(mountPointMock);
    app = new App();
    app.use('container', Container);
    app.useProp(FlexProp);
    app.init(mountPoint, '123', [...tree]);
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
