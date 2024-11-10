<template>
  <div class="wrapContainer">
    <div class="heading-row">
      <h3 class="options-heading">{{ title }}</h3>
    </div>
    
    <div class="options-preview">
      <div class="column">
        <img :src="img" alt="component-icon" />
        <n-button ghost color="#7b7bfe" @click="create">Создать</n-button>
      </div>
    </div>
  </div>
  
  <n-divider />

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useEditorStore from '@/store/editor.store.ts';
import useWidgetLibraryStore from '@/store/widget-library.store.ts';
import { useNotification } from 'naive-ui';

export default defineComponent({
  name: 'BlockComponent',
  props: {
    title: String,
    component: String,
    img: {
      type: String,
      default: '/img.png'
    },
    //It could be 'provided' or 'widget'
    componentType: {
      type: String,
      default: 'provided'
    }
  },
  setup() {
    return {
      notificationStore: useNotification(),
      editorStore: useEditorStore(),
      widgetLibraryStore: useWidgetLibraryStore()
    }
  },
  methods: {
    async create() {
      let pickedComponent = this.component
      if (this.componentType === 'widget') {
        const loaded = await this.widgetLibraryStore.loadWidgetData(Number(this.component))
        loaded.toastIfError(this.notificationStore);
        if (loaded.success)
          pickedComponent = loaded.getData().data
      }
      this.editorStore.pickBlock({ component: pickedComponent, icon: this.img, widget: this.componentType == 'widget' });
    }
  }
});
</script>

<style scoped>
  .wrapContainer {
    background-color: #ffffff;
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  .heading-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .options-heading {
    font-size: 20px;
    font-weight: 600;
    color: #6f6c99;
  }
  .options-preview {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .column {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 0.7rem
  }
</style>