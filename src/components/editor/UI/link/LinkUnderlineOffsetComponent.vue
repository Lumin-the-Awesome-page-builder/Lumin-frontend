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
        @update="update(index, $event)"
      />
    </div>
  </template>
  
  <script lang="ts">
  import OptionHeadingComponent from '../../OptionHeadingComponent.vue';
  import SliderComponent from '../../SliderComponent.vue';
  import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';
  
  export default {
    name: 'LinkUnderlineOffsetComponent',
    components: { OptionHeadingComponent, SliderComponent },
    props: {
      prop: {
        type: LinkUnderlineOffsetProp
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
            subheading: 'Расстояние до текста',
            value: this.prop.value[0],
            marks: {
              ...Object.keys(this.prop.availableValues[0]).map(key => {
                const numKey = Number(key);
                return { [numKey]: `${numKey}%` };
              }).reduce((acc, curr) => Object.assign(acc, curr), {})
            },
          },
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
  