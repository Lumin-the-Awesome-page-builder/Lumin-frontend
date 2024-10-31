import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import CardGrid from '@/components/CardGrid.vue';
import CardComponent from '@/components/CardComponent.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('Test Card Grid', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders correctly with empty data', () => {
    const wrapper = mount(CardGrid, {
      props: {
        data: [],
      },
    });

    expect(wrapper.findAllComponents(CardComponent)).toHaveLength(0);
  });

  it('renders correctly with data', () => {
    const mockData = [
      {
        id: 1,
        name: 'Проект 1',
        date: '2023-10-29',
        stars: 5,
        imageSrc: 'path/to/image1.jpg',
      },
    ];

    const wrapper = mount(CardGrid, {
      props: {
        data: mockData,
      },
    });

    expect(wrapper.findAllComponents(CardComponent)).toHaveLength(1);

    const firstCard = wrapper.findComponent(CardComponent);
    expect(firstCard.props().title).toBe(mockData[0].name);
    expect(firstCard.props().date).toEqual(new Date(mockData[0].date));
    expect(firstCard.props().stars).toBe(mockData[0].stars);
    expect(firstCard.props().imageSrc).toBe(mockData[0].imageSrc);
  });
});
