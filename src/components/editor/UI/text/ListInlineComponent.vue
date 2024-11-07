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
          @update="checked(index, $event)"
        />
      </div>
    </div>
  <n-divider />
  </template>
  
  <script lang="ts">
  import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import ListInlineProp from '@/editor/properties/text/ListInlineProp.ts';
  
  export default {
    name: 'ListInlineComponent',
    components: {
      CheckboxComponent, OptionHeadingComponent
    },
    props: {
      prop: {
        type: ListInlineProp
      }
    },
    computed: {
      checkboxes() {
        return [
          {
            subheading: 'Отображать список в линию',
            label: 'Включить',
            size: 'large',
            value: !!this.prop.value[0],
          },
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
  