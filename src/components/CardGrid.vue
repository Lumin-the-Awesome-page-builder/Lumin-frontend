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
      padding-right: 1rem;
  }
  .card-grid {
      display: flex;
      flex-wrap: wrap;
      row-gap: 3rem;
      justify-content: space-between;
  }
  .card-grid > * {
    flex: 0 0 27vw;
    width: 30%;
  }
  </style>
  