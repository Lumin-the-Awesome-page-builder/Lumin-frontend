<template>
  <n-input class="search-input" placeholder="Введите фразу для поиска..." v-model:value="searchValue">
    <template #prefix>
      <n-icon :component="Search" color="#6F6C99" />
    </template>
  </n-input>
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
import { shallowRef } from 'vue'
import BlockComponent from '@/components/editor/BlockComponent.vue';
import useWidgetLibraryStore from '@/store/widget-library.store.ts';
import { Search } from '@vicons/ionicons5';

export default {
  name: 'AvailableWidgetsComponent',
  components: {
    BlockComponent
  },
  data: () => ({
    searchValue: "",
    Search: shallowRef(Search)
  }),
  setup() {
    return { widgetLibraryStore: useWidgetLibraryStore() }
  },
  async mounted() {
    await this.widgetLibraryStore.loadWidgets()
  },
  computed: {
    widgets() {
      if (this.searchValue.length > 0)
        return this.widgetLibraryStore.getData.filter(el => el.name.toLowerCase().includes(this.searchValue.toLowerCase()))
      else
        return this.widgetLibraryStore.getData
    }
  }
};
</script>


<style scoped>

</style>