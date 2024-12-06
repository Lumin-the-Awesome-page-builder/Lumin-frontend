<template>
    <n-scrollbar
      style="height: 100%; max-height: 76vh; overflow-y: auto"
      class="cards-scroll-area"
    >
      <div class="card-grid">
        <component
          v-for="data in dataOnRender"
          :is="cardComponents[contentType]"
          :key="data.id"
          :id="data.id"
          :title="data.name"
          :preview="data.preview"
          :date="new Date(data.date)"
          :stars="data.stars"
          :item-type="contentType"
        />
      </div>
    </n-scrollbar>
  </template>
  
  <script lang="ts">
  import CardComponent from '@/components/CardComponent.vue';
  import usePreviewModalStore from '@/store/project-preview-modal.store.ts';
  import useDashboardStore from '@/store/dashboard.store.ts';
  
  export default {
    name: 'CardGrid',
    props: {
      cards: {
        type: Array,
        required: true
      },
      contentType: {
        type: String,
        default: 'project'
      }
    },
    setup() {
      return {
        previewModalStore: usePreviewModalStore(),
        dashboardStore: useDashboardStore(),
      }
    },
    components: {
      CardComponent,
    },
    computed: {
      dataOnRender() {
        if (this.dashboardStore.search.length > 0) {
          return this.cards.filter(el => el.name.toLowerCase().includes(this.dashboardStore.search))
        } else return this.cards
      },
      cardComponents() {
        return {
          'project': CardComponent,
          'widget': CardComponent,
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
  