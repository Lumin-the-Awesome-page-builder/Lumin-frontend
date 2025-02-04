import { mount } from '@vue/test-utils';
import { it, expect, describe, vi } from 'vitest';
import LoginComponent from '@/components/LoginComponent.vue';
import { EyeOff, EyeSharp } from '@vicons/ionicons5';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

vi.mock('naive-ui', () => {
  return {
    useNotification: vi.fn(() => 'notificationStore'),
  };
});

describe('Test LoginComponent', () => {
  const wrapper = mount(LoginComponent, {
    attachTo: document.body,
  });

  it('displays email and password labels correctly', () => {
    const emailLabel = wrapper.find('.block_title.title');
    const passwordLabel = wrapper.findAll('.block_title.title')[1];

    expect(emailLabel.text()).toBe('Адрес эл. почты');
    expect(passwordLabel.text()).toBe('Пароль');
  });

  it('toggles password visibility', () => {
    expect(wrapper.vm.typeInput).toBe('password');
    expect(wrapper.vm.icon).toStrictEqual(EyeSharp);

    wrapper.vm.showPassword();

    expect(wrapper.vm.typeInput).toBe('text');
    expect(wrapper.vm.icon).toStrictEqual(EyeOff);

    wrapper.vm.showPassword();

    expect(wrapper.vm.typeInput).toBe('password');
    expect(wrapper.vm.icon).toStrictEqual(EyeSharp);
  });
  it('test findTokenFunc', () => {
    const expectData = 'test#1234567891234token&not';

    const resultData = wrapper.vm.findToken(expectData);
    expect(resultData).toEqual('token');
  });
});
