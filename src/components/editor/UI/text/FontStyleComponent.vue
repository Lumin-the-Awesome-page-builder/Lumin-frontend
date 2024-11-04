<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Font Style"
        popoverTitle="Font style"
        popoverText="Начертание шрифта."
      />
      <n-button-group>
        <n-button
          v-for="(button, index) in buttons"
          :key="index"
          :ghost="activeButton !== index"
          color="#7b7bfe"
          @click="setActiveButton(index)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            :viewBox="button.viewBox"
            width="20px"
            :fill="activeButton === index ? '#ffffff' : '#7b7bfe'"
          >
            <path :d="button.path" />
          </svg>
        </n-button>
      </n-button-group>
    </div>
  </template>
  
  <script lang="ts">
  import { NButton } from 'naive-ui'
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  
  export default {
    name: 'FontStyleComponent',
    components: { OptionHeadingComponent, 'n-button': NButton },
    data: () => ({
      activeButton: null as number | null,
      buttons: [
        {
          path: 'm131-252 165-440h79l165 440h-76l-39-112H247l-40 112h-76Zm139-176h131l-64-182h-4l-63 182Zm395 186q-51 0-81-27.5T554-342q0-44 34.5-72.5T677-443q23 0 45 4t38 11v-12q0-29-20.5-47T685-505q-23 0-42 9.5T610-468l-47-35q24-29 54.5-43t68.5-14q69 0 103 32.5t34 97.5v178h-63v-37h-4q-14 23-38 35t-53 12Zm12-54q35 0 59.5-24t24.5-56q-14-8-33.5-12.5T689-393q-32 0-50 14t-18 37q0 20 16 33t40 13Z',
          viewBox: '0 -960 960 960',
        },
        {
          path: 'M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z',
          viewBox: '0 -960 960 960',
        }
      ],
    }),
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
  </style>
  