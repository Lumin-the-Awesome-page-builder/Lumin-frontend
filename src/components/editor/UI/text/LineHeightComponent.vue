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
        @update="update(index, $event)"
      />
    </div>
  </template>
  
  <script lang="ts">
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import SliderComponent from '@/components/editor/SliderComponent.vue';
  import LineHeightProp from '@/editor/properties/text/LineHeightProp.ts';
  
  export default {
    name: 'LineHeightComponent',
    components: { OptionHeadingComponent, SliderComponent },
    props: {
      prop: {
        type: LineHeightProp
      }
    },
    methods: {
      update(index, data) {
        console.log(index, data)
        this.prop.setValue(data, index)
      }
    },
    data: () => ({
      labels: {
        0: "1",
        33: "S",
        66: "Base",
        100: "L"
      }
    }),
    computed: {
      values() {
        return [
          {
            subheading: 'Межстрочный интервал',
            value: this.prop.value[0],
            marks: {
              ...Object.keys(this.prop.availableValues[0]).map(key => {
                const numKey = Number(key);
                return { [numKey]: this.labels[numKey] };
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
  