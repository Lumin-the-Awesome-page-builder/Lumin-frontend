<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Link Underline Opacity"
        popoverTitle="Link underline opacity"
        popoverText="Свойство link underline opacity позволяет установить прозрачность для подчеркивающей полоски у ссылки в различных условиях."
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
  import { ref } from 'vue';
  import OptionHeadingComponent from '../../OptionHeadingComponent.vue';
  import SliderComponent from '../../SliderComponent.vue';
  
  export default {
    name: 'LinkUnderlineOpacityComponent',
    components: { OptionHeadingComponent, SliderComponent },
    data: () => ({
      values: [
        {
          subheading: 'Прозрачность',
          value: 10,
          marks: {
            0: '0%',
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
  