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
        @update="update(index, $event)"
      />
    </div>
  <n-divider />
  </template>
  
  <script lang="ts">
  import OptionHeadingComponent from '../OptionHeadingComponent.vue';
  import SliderComponent from '../SliderComponent.vue';
  import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';
  
  export default {
    name: 'BorderRadiusComponent',
    components: { OptionHeadingComponent, SliderComponent },
    emits: ['changed'],
    props: {
      prop: {
        type: BorderRadiusProp
      }
    },
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
            subheading: 'Размер скругления',
            value: this.prop.value[0] !== null ? this.prop.value[0] : this.prop.defaultValue[0],
            marks: {
              ...Object.keys(this.prop.availableValues[0]).map(key => {
                const numKey = Number(key);
                return { [numKey]: `${numKey}%` };
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
  