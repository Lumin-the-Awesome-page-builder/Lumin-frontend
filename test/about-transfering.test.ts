import { mount } from '@vue/test-utils';
import { test, vi, expect } from 'vitest';
import HelloWorld from '@/components/HelloWorld.vue';

test('Not process to about if count not even', async () => {
  const mockRoute = {};

  const mockRouter = {
    push: vi.fn(),
  };

  const wrapper = mount(HelloWorld, {
    props: {
      count: 1,
    },
    global: {
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    },
  });

  await wrapper.find('button').trigger('click');

  expect(mockRouter.push).toHaveBeenCalledTimes(0);
});

test('allows processing to about for user with even count', async () => {
  const mockRoute = {};

  const mockRouter = {
    push: vi.fn(),
  };

  const wrapper = mount(HelloWorld, {
    props: {
      count: 2,
    },
    global: {
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    },
  });

  await wrapper.find('button').trigger('click');

  expect(mockRouter.push).toHaveBeenCalledTimes(1);
  expect(mockRouter.push).toHaveBeenCalledWith('/about');
});
