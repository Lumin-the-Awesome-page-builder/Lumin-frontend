<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Link Underline Offset"
        popoverTitle="Link underline offset"
        popoverText="Расстояние между текстом и подчеркивающей полосой."
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
    name: 'LinkUnderlineOffsetComponent',
    components: { OptionHeadingComponent, SliderComponent },
    data: () => ({
      values: [
        {
          subheading: 'Расстояние до текста',
          value: 1,
          marks: {
            0: '1',
            50: '2',
            100: '3',
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
  