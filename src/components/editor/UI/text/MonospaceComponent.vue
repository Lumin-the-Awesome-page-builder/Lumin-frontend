<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Monospace"
        popoverTitle="Моноширный текст"
        popoverText="Включает отображение моноширного шрифта"
      />
      <div class="checkboxContainer">
        <CheckboxComponent
          v-for="(checkbox, index) in checkboxes"
          :key="index"
          :subheading="checkbox.subheading"
          :label="checkbox.label"
          :size="checkbox.size"
          @update="checked(index, $event)"
        />
      </div>
    </div>
  <n-divider />
  </template>
  
  <script lang="ts">
  import CheckboxComponent from '../../CheckboxComponent.vue';
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
  
  export default {
    name: 'MonospaceComponent',
    components: {
      CheckboxComponent, OptionHeadingComponent
    },
    props: {
      prop: {
        type: MonoSpaceProp
      }
    },
    computed: {
      checkboxes() {
        return [
          {
            subheading: 'Моноширный шрифт',
            label: 'Включить',
            size: 'large',
            value: !!this.prop.value[0],
          }
        ]
      }
    },
    methods: {
      checked(index, data) {
        if (data)
          this.prop.setValue('checked', index)
        else
          this.prop.setValue(null, index)
      }
    }
  }
  </script>
  
  <style scoped>
  .wrapContainer {
    background-color: #ffffff;
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  
  .checkboxContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  </style>
  