<template>
  <n-input class="search-input" placeholder="Введите фразу для поиска..." v-model:value="searchValue">
    <template #prefix>
      <n-icon :component="Search" color="#6F6C99" />
    </template>
  </n-input>
  <BlockComponent
    v-for="block in blocksOnRender"
    :key="block.name"
    :title="block.title"
    :component="block.name"
  />
</template>

<script lang="ts">
import { shallowRef } from 'vue'
import BlockComponent from '@/components/editor/BlockComponent.vue';
import Component from '@/editor/core/component/Component.ts'
import { Search } from '@vicons/ionicons5';

export default {
  name: 'AvailableBlocksComponent',
  components: {
    BlockComponent,
  },
  data: () => ({
    searchValue: "",
    Search: shallowRef(Search)
  }),
  props: {
    blocks: {
      type: Array<Component>
    }
  },
  computed: {
    blocksOnRender() {
      if (this.searchValue.length > 0)
        return this.blocks.filter(el => el.title.toLowerCase().includes(this.searchValue.toLowerCase()))
      else
        return this.blocks
    }
  }
};
</script>


<style scoped>
.search-input {
  border-radius: 10px;
}
</style>