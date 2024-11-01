<template>
    <n-scrollbar
      style="height: 100%; max-height: 76vh; overflow-y: auto"
      class="cards-scroll-area"
    >
      <div class="card-grid">
        <component
          v-for="data in data"
          :is="cardComponents[type]" 
          :key="data.id"
          :id="data.id"
          :title="data.name"
          :date="new Date(data.date)"
          :stars="data.stars"
          :imageSrc="data.imageSrc || ''"
        />
      </div>
    </n-scrollbar>
  </template>
  
  <script lang="ts">
  import CardComponent from '@/components/CardComponent.vue';
  import usePreviewModalStore from '@/store/project-preview-modal.store.ts';
  
  export default {
    name: 'CardGrid',
    props: {
      data: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        default: 'default'
      }
    },
    setup() {
      return {
        previewModalStore: usePreviewModalStore(),
      }
    },
    components: {
      CardComponent,
    },
    computed: {
      cardComponents() {
        return {
          default: CardComponent,
        };
      }
    }
  };
  </script>
  
  <style lang="css">
  .cards-scroll-area {
      height: 100%;
      max-height: 60vh;
      overflow-y: auto; 
  }
  .card-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 3rem;
      justify-content: flex-start;
  }
  .card-grid > * {
      flex: 0 1 440px;
      max-width: 440px;
  }
  </style>
  