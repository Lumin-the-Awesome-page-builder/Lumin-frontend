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
          :color="button.color"
          :class="{ 'hover-effect': activeButton !== index }"
          :style="{ opacity: activeButton === index ? 1 : 0.5 }"
          class="circle-button"
          @click="setActiveButton(index)"
        />
      </n-button-group>
    </div>
  </template>
  
  <script lang="ts">
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue'
  import { NButton } from 'naive-ui'
  
  export default {
    name: 'LinkColorComponent',
    components: { OptionHeadingComponent, "n-button": NButton },
    data() {
      return {
        activeButton: 0 as number,
        buttons: [
          { type: 'primary', color: '#007bff' }, 
          { type: 'secondary', color: '#6c757d' }, 
          { type: 'success', color: '#28a745' },   
          { type: 'danger', color: '#dc3545' },
          { type: 'warning', color: '#ffc107' },
          { type: 'info', color: '#17a2b8' },
          { type: 'light', color: '#f8f9fa' },
          { type: 'dark', color: '#343a40' },
        ],
      };
    },
    methods: {
      setActiveButton(index: number) {
        this.activeButton = index;
      },
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
  