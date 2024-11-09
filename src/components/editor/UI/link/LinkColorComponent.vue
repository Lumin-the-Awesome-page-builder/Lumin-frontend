<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Link Color"
        popoverTitle="Link color"
        popoverText="Выберите цвет ссылки из доступных типов."
      />
      <n-button-group>
        <n-button
          v-for="(button, index) in buttons"
          :key="index"
          :color="colors[button]"
          :class="{ 'hover-effect': activeButton !== index }"
          :style="{ opacity: activeButton === index ? 1 : 0.3 }"
          class="circle-button"
          @click="setActiveButton(index, button)"
        />
      </n-button-group>
    </div>
  <n-divider />
  </template>
  
  <script lang="ts">
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue'
  import { NButton } from 'naive-ui'
  import LinkColorProp from '@/editor/properties/link/LinkColorProp.ts';
  
  export default {
    name: 'LinkColorComponent',
    components: { OptionHeadingComponent, "n-button": NButton },
    emits: ['changed'],
    props: {
      prop: {
        type: LinkColorProp
      }
    },
    data: () => ({
      activeButton: 0,
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        light: '#f8f9fa',
        dark: '#343a40',
      },
    }),
    mounted() {
      const value = this.prop.value[1] ? this.prop.value[1] : this.prop.defaultValue[1]
      this.activeButton = Object.keys(this.colors).indexOf(value)
    },
    methods: {
      setActiveButton(index: number, value) {
        const onSet = (this.activeButton == index) ? null : value
        this.activeButton = (this.activeButton == index) ? null : index
        this.prop.setValue(onSet)
        this.$emit('changed')
      },
    },
    computed: {
      buttons() {
        return Object.keys(this.prop.availableValues[0])
      }
    },
  };
  </script>
  
  <style scoped>
  .wrapContainer {
    background-color: #ffffff;
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  
  .circle-button {
    width: 30px; 
    height: 30px; 
    border-radius: 50%; 
  }
  .circle-button:hover {
    opacity: 0.8!important;
  }
  
  </style>
  