<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Link Opacity"
        popoverTitle="Link opacity"
        popoverText="Свойство link opacity позволяет установить прозрачность ссылки в различных условиях."
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
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import SliderComponent from '@/components/editor/SliderComponent.vue';
  import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';
  
  export default {
    name: 'LinkOpacityComponent',
    components: { OptionHeadingComponent, SliderComponent },
    emits: ['changed'],
    props: {
      prop: {
        type: LinkOpacityProp
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
            subheading: 'Стандартная прозрачность',
            value: this.prop.value[0] !== null ? this.prop.value[0] : this.prop.defaultValue[0],
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
  