<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Fluid Image"
        popoverTitle="Fluid image"
        popoverText="Позволяет изображению автоматически менять свой размер в зависимости от размера его родительского элемента."
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
  import ImgFluidProp from '@/editor/properties/ImgFluidProp.ts';
  
  export default {
    name: 'ImgFluidComponent',
    components: {
      CheckboxComponent, OptionHeadingComponent
    },
    emits: ['changed'],
    props: {
      prop: {
        type: ImgFluidProp
      },
    },
    methods: {
      checked(index, data) {
        if (data)
          this.prop.setValue('checked', index)
        else
          this.prop.setValue(null, index)
        
        this.$emit('changed')
      }
    },
    computed: {
      checkboxes() {
        return [
          {
            subheading: 'Fluid image',
            label: 'Включить',
            size: 'large',
            value: !!this.prop.value[0],
          }
        ]
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
  