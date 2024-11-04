<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Link Opacity"
        popoverTitle="Link opacity"
        popoverText="Свойство link opacity позволяет установить прозрачность ссылки в различных условиях."
      />
      <SliderComponent
        v-for="(slider, index) in values"
        :key="index"
        :marks="slider.marks"
        :initialValue="slider.value"
        :subheading="slider.subheading"
      />
    </div>
  </template>
  
  <script lang="ts">
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import SliderComponent from '@/components/editor/SliderComponent.vue';
  
  export default {
    name: 'LinkOpacityComponent',
    components: { OptionHeadingComponent, SliderComponent },
    data: () => ({
      values: [
        {
          subheading: 'Стандартная прозрачность',
          value: 10,
          marks: {
            10: '10%',
            25: '25%',
            50: '50%',
            75: '75%',
            100: '100%',
          },
        },
        {
          subheading: 'Прозрачность при наведении',
          value: 10,
          marks: {
            10: '10%',
            25: '25%',
            50: '50%',
            75: '75%',
            100: '100%',
          },
        },
      ]
    })
  };
  </script>
  
  <style scoped>
  .wrapContainer {
    background-color: #ffffff;
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  </style>
  