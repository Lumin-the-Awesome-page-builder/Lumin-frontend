<template>
  <BlockComponent
    v-for="block in blocks"
    :key="block.name"
    :title="block.title"
    :component="block.name"
  />
</template>

<script lang="ts">
import BlockComponent from '@/components/editor/BlockComponent.vue';
import Component from '@/editor/core/component/Component.ts'

export default {
  name: 'AvailableBlocksComponent',
  components: {
    BlockComponent
  },
  props: {
    blocks: {
      type: Array<Component>
    }
  }
};
</script>


<style scoped>

</style>