<template>
  <div
    class="pure-edit-modal-wrapper"
    v-if="showModal"
  >
    <div class="pure-edit-modal-content">
      <Codemirror
        v-if="showEdit"
        v-model:value="code"
        :options="cmOptions"
        class="cm-component"
        height="600px"
        width="800px"
      />
      <div class="btn-container">
        <n-button color="#7b7bfe" @click="change">Сохранить</n-button>
        <n-button color="#7b7bfe" @click="changeAndExit">Сохранить и выйти</n-button>
      </div>
    </div>
  </div>
  <n-button @click="openEditModal">Редактировать</n-button>
</template>

<script lang="ts">
import Codemirror from "codemirror-editor-vue3";
import "codemirror/mode/htmlmixed/htmlmixed"
import "codemirror/addon/display/placeholder";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/html-hint";
//@ts-ignore
import "codemirror/theme/dracula.css";
//@ts-ignore
import "codemirror/addon/hint/show-hint.css";

import { PureContentProp } from '@/editor/properties/PureContentProp.ts';
import useEditorStore from '@/store/editor.store.ts';

export default {
  name: 'PureContentComponent',
  components: { Codemirror },
  emits: ['changed'],
  props: {
    prop: PureContentProp
  },
  setup() {
    return { editorStore: useEditorStore() }
  },
  data: () => ({
    code: "",
    cmOptions: {
      mode: "text/html",
      theme: "dracula",
    },
    showModal: false,
    showEdit: true,
  }),
  mounted() {
    this.code = this.prop.value[0]
  },
  methods: {
    change() {
      this.prop.setValue([this.code, "", ""]);
      const app = this.editorStore.app;
      app.replacePure(this.prop.component)
      this.$emit('changed')
    },
    changeAndExit() {
      this.change()
      this.showModal = false
    },
    openEditModal() {
      this.showModal = true;
      this.showEdit = false;
      this.$nextTick(() => {
        this.showEdit = true;
      })
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');

.pure-edit-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.pure-edit-modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cm-component > * {
  font-family: "Source Code Pro", monospace;
  font-optical-sizing: auto;
  font-size: 20px;
  font-style: normal;
}

.btn-container {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

</style>