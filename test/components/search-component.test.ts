import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchComponent from '@/components/SearchComponent.vue';

describe('SearchComponent', () => {
  it('отображает начальное значение из пропса searchValue', () => {
    const initialSearchValue = 'Начальный запрос';
    const wrapper = mount(SearchComponent, {
      props: { searchValue: initialSearchValue },
    });

    const input = wrapper.find('.search-input');
    expect(input.element.value).toBe(initialSearchValue);
  });

  it('обновляет searchQuery при изменении searchValue извне', async () => {
    const wrapper = mount(SearchComponent, {
      props: { searchValue: 'Первоначальный текст' },
    });

    // Изменим пропс searchValue
    await wrapper.setProps({ searchValue: 'Новый текст' });

    // Убедимся, что значение в поле input обновилось
    const input = wrapper.find('.search-input');
    expect(input.element.value).toBe('Новый текст');
  });

  it('эмитирует событие "update:searchValue" при вводе текста', async () => {
    const wrapper = mount(SearchComponent, {
      props: { searchValue: '' },
    });

    const input = wrapper.find('.search-input');
    await input.setValue('Поисковый запрос');

    expect(wrapper.emitted('update:searchValue')).toBeTruthy();
    expect(wrapper.emitted('update:searchValue')?.[0]).toEqual([
      'Поисковый запрос',
    ]);
  });

  it('рендерит иконку поиска', () => {
    const wrapper = mount(SearchComponent);
    const searchIcon = wrapper.find('.search-icon');

    expect(searchIcon.exists()).toBe(true);
    expect(searchIcon.attributes('src')).toBe(
      '/src/assets/imageSearch/search.svg',
    );
  });
});
