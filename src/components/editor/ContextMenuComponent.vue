<template>
  <n-button-group class="context-menu" id="context-menu" vertical>
    <n-button @mouseover="hover(item)" @mouseleave="removeHover(item)" color="#7b7bfe" v-for="item in items" :key="item.key" @click="handler(item)">
      {{ item.getTitle() }}
    </n-button>
  </n-button-group>
</template>

<script lang="ts">
import useEditorStore from '@/store/editor.store.ts';

export default {
  name: 'ContextMenuComponent',
  setup() {
    const editorStore = useEditorStore()
    return { editorStore }
  },
  mounted() {
    this.editorStore.$onAction(({ name, args, after }) => {
      if (name == "openContext") {
        after((_) => {
          const ctx = document.getElementById('context-menu')
          ctx.style = `display: flex; opacity: 1; transform: translateX(${args[1].x}px) translateY(${args[1].y}px);`;
        })
      }
      if (name == "closeContext") {
        after((_) => {
          const ctx = document.getElementById('context-menu')
          ctx.style = `opacity: 0;`;
          setTimeout(() => {
            ctx.style += 'display: none'
          }, 200)
        })
      }
    })
  },
  // data: () => ({
  //   collapsed: true
  // }),
  methods: {
    handler(item) {
      this.editorStore.triggerContextItem(item)
      item.htmlElement.classList.remove('selected')
    },
    hover(item) {
      item.htmlElement.classList.add('selected')
    },
    removeHover(item) {
      item.htmlElement.classList.remove('selected')
    }
  },
  computed: {
    items() {
      return this.editorStore.getContextMenuItems
    }
  }
}
</script>

<style scoped>

</style>