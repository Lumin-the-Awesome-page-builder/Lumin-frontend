import { mount } from '@vue/test-utils';
import { describe, beforeEach, it, vi, expect } from 'vitest';
import ContextMenuComponent from '@/components/editor/ContextMenuComponent.vue';
import useEditorStore from '@/store/editor.store.ts';

vi.mock('@/store/editor.store.ts', () => {
  const onAction = vi.fn();
  const triggerMock = vi.fn();
  return {
    default: () => ({
      $onAction: onAction,
      triggerContextItem: triggerMock,
    }),
  };
});

describe('context menu component tests', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ContextMenuComponent);
  });

  it('handler tests', () => {
    const itemMock = {
      htmlElement: {
        classList: {
          remove: vi.fn(),
        },
      },
    };
    const eventMock = {
      stopPropagation: vi.fn(),
    };
    const store = useEditorStore();

    wrapper.vm.handler(itemMock, eventMock);

    expect(store.triggerContextItem).toBeCalledWith(itemMock);
    expect(itemMock.htmlElement.classList.remove).toBeCalledWith('selected');
    expect(eventMock.stopPropagation).toBeCalled();
  });

  it('hover tests', () => {
    const itemMock = {
      htmlElement: {
        classList: {
          add: vi.fn(),
        },
      },
    };

    wrapper.vm.hover(itemMock);

    expect(itemMock.htmlElement.classList.add).toBeCalledWith('selected');
  });

  it('remove hover tests', () => {
    const itemMock = {
      htmlElement: {
        classList: {
          remove: vi.fn(),
        },
      },
    };

    wrapper.vm.removeHover(itemMock);

    expect(itemMock.htmlElement.classList.remove).toBeCalledWith('selected');
  });
});
