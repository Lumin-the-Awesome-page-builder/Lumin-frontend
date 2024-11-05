<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Column Width"
      popoverTitle="Column width"
      popoverText="В Bootstrap система колонок основана на 12-колоночной сетке, что означает, что ширина контейнера делится на 12 равных частей. При использовании классов, таких как col-8 и col-12, вы определяете, сколько из этих 12 частей будет занимать конкретный элемент"
    />
    <SliderComponent
      v-for="(slider, index) in values"
      :key="index"
      :showMarks="false" 
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
  name: 'ColWidthComponent',
  components: { OptionHeadingComponent, SliderComponent },
  data: () => ({
    values: [
      {
        subheading: 'Ширина колонки',
        value: 0,
        marks: {
          0: '1/12',
          8: '2/12',
          17: '3/12',
          25: '4/12',
          33: '5/12',
          42: '6/12',
          50: '7/12',
          58: '8/12',
          67: '9/12',
          75: '10/12',
          83: '11/12',
          100: '12/12',
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
