<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Gap"
        popoverTitle="Gap"
        popoverText="Gap — это пространство между колонками, которое помогает управлять размещением и выравниванием контента в системе сеток"
      />
      <SliderComponent
        v-for="(slider, index) in values"
        :key="index"
        :showMarks="true" 
        :marks="slider.marks"
        :initialValue="slider.value"
        :subheading="slider.subheading"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import OptionHeadingComponent from '../OptionHeadingComponent.vue';
  import SliderComponent from '../SliderComponent.vue';
  
  export default {
    name: 'GutterComponent',
    components: { OptionHeadingComponent, SliderComponent },
    data: () => ({
      values: [
        {
          subheading: 'Отступы между элементами',
          value: 0,
          marks: {
            0: '0',
            20: '1',
            40: '2',
            60: '3',
            80: '4',
            100: '5',
          },
        },
      ]
    }),
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
  