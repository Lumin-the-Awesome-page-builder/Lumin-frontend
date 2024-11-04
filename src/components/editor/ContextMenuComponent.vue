<template>
  <n-flex id="context-menu-wrapper" vertical>
    <n-button v-for="item in items" :key="item.key" @click="select(item)">
      {{ item.name }}
    </n-button>
  </n-flex>
</template>

<script setup lang="ts">
import useContextMenuStore from '@/store/context-menu.store.ts'

export default {
  name: 'ContextMenuComponent',
  setup() {
    const contextMenuStore = useContextMenuStore()
    contextMenuStore.$onAction(({ name, store, args, after, onError }) => {
      if (name == "open") {
        after((_) => {
          const ctx = document.getElementById("context-menu-wrapper")
          ctx.attributes["style"] = `position: absolute; left: ${store.position.x}px; top: ${store.position.y}px; display: flex;`
        })
      }
      if (name == "close") {
        after((_) => {
          const ctx = document.getElementById("context-menu-wrapper")
          ctx.attributes["style"] = `display: none;`
        })
      }
    })
    
    return { contextMenuStore }
  },
  methods: {
    select(item) {
      this.contextMenuStore.select(item)
    }
  },
  computed: {
    items() {
      return this.contextMenuStore.getItems
    }
  }
}
</script>

<style scoped>

</style>