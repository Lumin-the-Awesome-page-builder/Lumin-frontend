<template>
  <n-button-group class="context-menu" id="context-menu" vertical ghost><!-- Дико извиняюсь за этот костылище, но я не хочу писать генераторы элементов списка, так что будет так, кто не согласен - может переписать это сам -->
    <template v-if="isSetupContext">
      <div class="movement-btn-row">
        <n-button color="#7b7bfe" @click="handler({val: 'move-left'}, $event)">
          <n-icon>
            <Left />
          </n-icon>
        </n-button>
        <n-button color="#7b7bfe" @click="handler({val: 'move-right'}, $event)">
          <n-icon>
            <Right />
          </n-icon>
        </n-button>
      </div>
    </template>
    
    <n-button @mouseover="hover(item)" @mouseleave="removeHover(item)" color="#7b7bfe" v-for="item in items" :key="item.key" @click="handler(item, $event)">
      {{ item.userName }}
    </n-button>
  </n-button-group>
</template>

<script lang="ts">
import { ArrowForward as Right, ArrowBack as Left} from '@vicons/ionicons5';
import useEditorStore from '@/store/editor.store.ts';

export default {
  name: 'ContextMenuComponent',
  components: {
    Right, Left
  },
  setup() {
    const editorStore = useEditorStore()
    return { editorStore }
  },
  data: () => ({
    hovered: null
  }),
  mounted() {
    this.editorStore.$onAction(({ name, args, after }) => {
      if (name == "openContext") {
        after((_) => {
          const ctx = document.getElementById('context-menu')
          ctx.style = `display: flex; opacity: 1; transform: translateX(${args[1].x}px) translateY(${args[1].y}px);`;
        })
      }
      if (name == "closeContext") {
        after((close) => {
          if (close) {
            if (this.hovered)
              this.hovered.classList.remove('selected')
            const ctx = document.getElementById('context-menu')
            ctx.style = `opacity: 0;`;
            setTimeout(() => {
              ctx.style += 'display: none'
            }, 200)
          }
        })
      }
    })
  },
  methods: {
    handler(item, ev) {
      ev.stopPropagation()
      this.editorStore.triggerContextItem(item)
      if (item.htmlElement)
        item.htmlElement.classList.remove('selected')
    },
    hover(item) {
      if (item.htmlElement) {
        this.hovered = item.htmlElement;
        item.htmlElement.classList.add('selected')
      }
    },
    removeHover(item) {
      this.hovered = null;
      if (item.htmlElement) {
        item.htmlElement.classList.remove('selected');
      }
    }
  },
  computed: {
    isSetupContext() {
      return this.editorStore.blockOnSetup;
    },
    items() {
      return this.editorStore.getContextMenuItems
    }
  }
}
</script>

<style scoped>
  .movement-btn-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>