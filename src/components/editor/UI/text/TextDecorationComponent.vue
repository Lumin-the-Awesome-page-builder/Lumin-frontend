<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Text Decoration"
        popoverTitle="Text decoration"
        popoverText="Подчеркнутый, зачеркнутый или обычный"
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
    name: 'TextDecorationComponent',
    components: { OptionHeadingComponent, 'n-button': NButton },
    data: () => ({
      activeButton: null as number | null,
      buttons: [
        {
          path: 'M420-160v-520H200v-120h560v120H540v520H420Z',
          viewBox: '0 -960 960 960',
        },
        {
          path: 'M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z',
          viewBox: '0 -960 960 960',
        },
        {
          path: 'M200-120v-80h560v80H200Zm280-160q-101 0-157-63t-56-167v-330h103v336q0 56 28 91t82 35q54 0 82-35t28-91v-336h103v330q0 104-56 167t-157 63Z',
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
  