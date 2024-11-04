<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="List Unstyled"
        popoverTitle="Отключить все декорации списка"
        popoverText="Выключает отсупы слева, а также точки списка"
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
    name: 'ListUnstyledComponent',
    components: {
      CheckboxComponent, OptionHeadingComponent
    },
    data: () => ({
      checkboxes: [
        { subheading: 'Отлючить стилизацию списка', label: 'Отключить', size: 'large' },
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
  