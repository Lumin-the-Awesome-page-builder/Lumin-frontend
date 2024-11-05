<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Font Weight"
      popoverTitle="Font weight"
      popoverText="Font Weight позволяет указать, насколько жирным будет выглядеть текст."
    />
    <SliderComponent
      :showMarks="true"
      :marks="slider.marks"
      :initialValue="slider.value"
      :subheading="slider.subheading"
    />
  </div>
</template>

<script lang="ts">
import { h, ref } from 'vue';
import OptionHeadingComponent from '../../OptionHeadingComponent.vue';
import SliderComponent from '../../SliderComponent.vue';

const renderMark = (weight: string, style: string) => {
    return h('div', [
      h(
        'span',
        { style: { fontWeight: weight, fontStyle: style, fontSize: '24px' } },
        'А',
      ),
    ]);
  }

export default {
  name: 'FontWeightComponent',
  components: { OptionHeadingComponent, SliderComponent },
  data: () => ({
    slider: {
      subheading: 'Толщина текста',
      value: 50,
      marks: {
        0: renderMark('lighter', 'normal'),
        25: renderMark('light', 'normal'),
        50: renderMark('normal', 'normal'),
        75: renderMark('bold', 'normal'),
        100: renderMark('bolder', 'normal'),
      },
    }
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
