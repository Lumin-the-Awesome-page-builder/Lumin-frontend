<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Border Radius"
        popoverTitle="Border radius"
        popoverText="Радиус скругления углов у объекта"
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
  import OptionHeadingComponent from '../OptionHeadingComponent.vue';
  import SliderComponent from '../SliderComponent.vue';
  
  export default {
    name: 'BorderRadiusComponent',
    components: { OptionHeadingComponent, SliderComponent },
    data: () => ({
      values: [
        {
          subheading: 'Размер скругления',
          value: 0,
          marks: {
            0: '0',
            20: '1px',
            40: '2px',
            60: '3px',
            80: '4px',
            100: '5px',
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
  