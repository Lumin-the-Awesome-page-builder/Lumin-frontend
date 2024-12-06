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
      @update="update(index, $event)"
    />
  </div>
  <n-divider />
</template>

<script lang="ts">
import OptionHeadingComponent from '../OptionHeadingComponent.vue';
import SliderComponent from '../SliderComponent.vue';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';

export default {
  name: 'ColWidthComponent',
  components: { OptionHeadingComponent, SliderComponent },
  emits: ['changed'],
  props: {
    prop: ColWidthProp,
  },
  data: () => ({
    labels: {
      0: 'auto',
      8: '1/12',
      16: '2/12',
      25: '3/12',
      33: '4/12',
      41: '5/12',
      50: '6/12',
      58: '7/12',
      66: '8/12',
      75: '9/12',
      83: '10/12',
      91: '11/12',
      100: '12/12',
    },
  }),
  methods: {
    update(index, data) {
      this.prop.setValue(data, index)
      this.$emit('changed')
    }
  },
  computed: {
    values() {
      return [
        {
          subheading: 'Ширина колонки',
          value: this.prop.value[0] == null ? this.prop.value[0] : this.prop.defaultValue[0],
          marks: {
            ...Object.keys(this.prop.availableValues[0]).map(key => {
              const numKey = Number(key);
              return { [numKey]: this.labels[numKey] };
            }).reduce((acc, curr) => Object.assign(acc, curr), {})
          },
        }
      ]
    }
  }
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
