<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Inline Text"
        popoverTitle="Внутренне оформление текста"
        popoverText="Включить выделение, или уменьшение текста"
      />
      <div class="checkboxContainer">
        <CheckboxComponent
          v-for="(checkbox, index) in checkboxes"
          :key="index"
          :subheading="checkbox.subheading"
          :label="checkbox.label"
          :size="checkbox.size"
          :init-value="checkbox.value"
          @update="checked(index, $event)"
        />
      </div>
    </div>
  <n-divider />
  </template>
  
  <script lang="ts">
  import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
  
  export default {
    name: 'InlineTextComponent',
    components: {
      CheckboxComponent, OptionHeadingComponent
    },
    props: {
      prop: {
        type: InlineTextProp
      }
    },
    computed: {
      checkboxes() {
        return [
          { subheading: 'Выделить текст', label: 'Выделить', size: 'large', value: !!this.prop.value[0] },
          { subheading: 'Уменьшить тест', label: 'Уменьшить', size: 'large', value: !!this.prop.value[1] },
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
  