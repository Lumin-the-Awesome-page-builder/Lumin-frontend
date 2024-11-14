<template>
  <n-button-group class="context-menu" id="context-menu" vertical ghost>
    <template v-if="isSetupContext">
      <div class="movement-btn-row">
        <n-button
          class="arrowButton"
          quaternary
          color="#7b7bfe"
          @click="handler({ val: 'move-left' }, $event)"
        >
          <n-icon>
            <Left />
          </n-icon>
        </n-button>
        <n-button
          class="arrowButton"
          quaternary
          color="#7b7bfe"
          @click="handler({ val: 'move-right' }, $event)"
        >
          <n-icon>
            <Right />
          </n-icon>
        </n-button>
      </div>
    </template>

    <div v-for="(item, index) in items" :key="item.key">
      <n-button
        :type="item.userName === 'Удалить' ? 'error' : 'default'"
        class="listButton"
        quaternary
        :color="item.userName !== 'Удалить' ? '#7b7bfe' : undefined"
        @mouseover="hover(item)"
        @mouseleave="removeHover(item)"
        @click="handler(item, $event)"
      >
        <template #icon>
          <n-icon v-if="getIconComponent(item.userName)">
            <component :is="getIconComponent(item.userName)" />
          </n-icon>
        </template>
        {{ item.userName }}
      </n-button>
      <n-divider v-if="index < items.length - 1" />
    </div>
  </n-button-group>
</template>

<script lang="ts">
import {
  ArrowForward as Right,
  ArrowBack as Left,
  Trash as TrashIcon,
  MoveSharp as MoveIcon,
  Pencil as EditIcon,
  Save as SaveIcon,
  Text as TextIcon,
  SquareOutline as ContainerIcon,
  CodeSlashOutline as CodeIcon,
  Image as ImageIcon,
  Link as LinkIcon
} from '@vicons/ionicons5';
import {
  Heading as HeadingIcon
} from '@vicons/fa'
import useEditorStore from '@/store/editor.store.ts';

export default {
  name: 'ContextMenuComponent',
  components: {
    Right,
    Left,
    TrashIcon,
    MoveIcon,
    EditIcon,
    SaveIcon,
    TextIcon,
    ContainerIcon,
    HeadingIcon,
    CodeIcon,
    ImageIcon,
    LinkIcon
    
  },
  setup() {
    const editorStore = useEditorStore();
    return { editorStore };
  },
  data: () => ({
    hovered: null,
  }),
  mounted() {
    this.editorStore.$onAction(({ name, args, after }) => {
      if (name == 'openContext') {
        after((_) => {
          const ctx = document.getElementById('context-menu');
          ctx.style = `display: flex; opacity: 1; transform: translateX(${args[1].x + 40}px) translateY(${args[1].y + 40}px);`;
        });
      }
      if (name == 'closeContext') {
        after((close) => {
          if (close) {
            if (this.hovered) this.hovered.classList.remove('selected');
            const ctx = document.getElementById('context-menu');
            ctx.style = `opacity: 0;`;
            setTimeout(() => {
              ctx.style += 'display: none';
            }, 200);
          }
        });
      }
    });
  },
  methods: {
    handler(item, ev) {
      ev.stopPropagation();
      this.editorStore.triggerContextItem(item);
      if (item.htmlElement) item.htmlElement.classList.remove('selected');
    },
    hover(item) {
      if (item.htmlElement) {
        this.hovered = item.htmlElement;
        item.htmlElement.classList.add('selected');
      }
    },
    removeHover(item) {
      this.hovered = null;
      if (item.htmlElement) {
        item.htmlElement.classList.remove('selected');
      }
    },
    getIconComponent(userName: string) {
      switch (userName) {
        case 'Удалить':
          return TrashIcon;
        case 'Переместить':
          return MoveIcon;
        case 'Редактировать':
          return EditIcon;
        case 'Сохранить виджет':
          return SaveIcon;
        case 'Текст':
          return TextIcon;
        case 'Контейнер':
          return ContainerIcon;
        case 'Заголовок':
          return HeadingIcon;
        case 'HTML + CSS + JS':
          return CodeIcon;
        case 'Картинка':
          return ImageIcon;
        case 'Ссылка':
          return LinkIcon;
        default:
          return null;
      }
    },
  },
  computed: {
    isSetupContext() {
      return this.editorStore.blockOnSetup;
    },
    items() {
      return this.editorStore.getContextMenuItems;
    },
  },
};
</script>

<style scoped>
.context-menu {
  box-shadow: 0 0 10px rgb(111 108 153 / 34%);
  background-color: #f8f8f8;
}
.arrowButton {
  width: 44px;
}
.context-menu {
  min-width: 10rem;
}
.movement-btn-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.listButton {
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  width: 100%;
}
:deep(.n-button) {
  display: flex;
  padding: 0;
  font-size: 17px;
  font-weight: 500;
}
:deep(.n-divider) {
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
