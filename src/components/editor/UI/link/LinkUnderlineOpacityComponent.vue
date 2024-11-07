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
        @update="update(index, $event)"
      />
    </div>
  <n-divider />
  </template>
  
  <script lang="ts">
  import OptionHeadingComponent from '../../OptionHeadingComponent.vue';
  import SliderComponent from '../../SliderComponent.vue';
  import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';
  
  export default {
    name: 'LinkUnderlineOpacityComponent',
    components: { OptionHeadingComponent, SliderComponent },
    props: {
      prop: {
        type: LinkUnderlineOpacityProp
      }
    },
    methods: {
      update(index, data) {
        this.prop.setValue(data, index)
      }
    },
    computed: {
      values() {
        return [
          {
            subheading: 'Стандартная прозрачность',
            value: this.prop.value[0] !== null ? this.prop.value[0] : 0,
            marks: {
              ...Object.keys(this.prop.availableValues[0]).map(key => {
                const numKey = Number(key);
                return { [numKey]: `${numKey}%` };
              }).reduce((acc, curr) => Object.assign(acc, curr), {})
            }
          },
          {
            subheading: 'Прозрачность при наведении',
            value: this.prop.value[1] !== null ? this.prop.value[1] : 0,
            marks: {
              ...Object.keys(this.prop.availableValues[1]).map(key => {
                const numKey = Number(key);
                return { [numKey]: `${numKey}%` };
              }).reduce((acc, curr) => Object.assign(acc, curr), {})
            }
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
  