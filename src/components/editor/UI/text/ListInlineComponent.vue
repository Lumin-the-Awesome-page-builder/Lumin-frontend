<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="List Inline"
        popoverTitle="Список в линию"
        popoverText="Включает отображение списков без точек и с небольшими отступами, в линию"
      />
      <div class="checkboxContainer">
        <CheckboxComponent
          v-for="(checkbox, index) in checkboxes"
          :key="index"
          :subheading="checkbox.subheading"
          :label="checkbox.label"
          :size="checkbox.size"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  
  export default {
    name: 'ListInlineComponent',
    components: {
      CheckboxComponent, OptionHeadingComponent
    },
    data: () => ({
      checkboxes: [
        { subheading: 'Отображать список в линию', label: 'Включить', size: 'large' },
      ],
    }),
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
  