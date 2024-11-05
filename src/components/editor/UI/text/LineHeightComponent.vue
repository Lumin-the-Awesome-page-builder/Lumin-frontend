<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Line Height"
        popoverTitle="Line height"
        popoverText="Межстрочный интервал"
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
    name: 'LineHeightComponent',
    components: { OptionHeadingComponent, SliderComponent },
    data: () => ({
      values: [
        {
          subheading: 'Межстрочный интервал',
          value: 0,
          marks: {
            0: '1',
            33: 'S',
            66: 'Base',
            100: 'L',
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
  