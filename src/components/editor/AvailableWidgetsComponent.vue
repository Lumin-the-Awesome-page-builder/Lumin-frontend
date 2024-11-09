<template>
  <BlockComponent
    v-for="widget in widgets"
    :key="widget.name"
    :title="widget.name"
    component-type="widget"
    :component="String(widget.id)"
    :img="widget.preview"
  />
</template>

<script lang="ts">
import BlockComponent from '@/components/editor/BlockComponent.vue';
import useWidgetLibraryStore from '@/store/widget-library.store.ts';

export default {
  name: 'AvailableWidgetsComponent',
  components: {
    BlockComponent
  },
  setup() {
    return { widgetLibraryStore: useWidgetLibraryStore() }
  },
  async mounted() {
    await this.widgetLibraryStore.loadWidgets()
  },
  computed: {
    widgets() {
      return this.widgetLibraryStore.getData
    }
  }
};
</script>


<style scoped>

</style>