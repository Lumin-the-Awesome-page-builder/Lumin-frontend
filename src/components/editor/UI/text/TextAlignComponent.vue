<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Text Align"
        popoverTitle="Text align"
        popoverText="Выравнивание текста"
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
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import { NButton } from 'naive-ui'
  
  export default {
    name: 'TextAlignComponent',
    components: { OptionHeadingComponent, "n-button": NButton },
    data: () => ({
      activeButton: null as number | null,
      buttons: [
        {
          path: 'M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z',
          viewBox: '0 -960 960 960',
        },
        {
          path: 'M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z',
          viewBox: '0 -960 960 960',
        },
        {
          path: 'M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z',
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
  