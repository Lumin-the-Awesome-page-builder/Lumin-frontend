<template>
  <div class="wrapContainer">
    <div class="heading-row">
      <h3 class="options-heading">{{ title }}</h3>
    </div>
    
    <div class="options-preview">
      <div class="column">
        <img src="@/assets/img.png" alt="component-icon" />
        <n-button ghost color="#7b7bfe" @click="create">Создать</n-button>
      </div>
    </div>
  </div>
  
  <n-divider />

</template>

<script lang="ts">

import useEditorStore from '@/store/editor.store.ts';

export default {
  name: 'BlockComponent',
  props: {
    title: String,
    component: String,
  },
  setup() {
    return { editorStore: useEditorStore() }
  },
  methods: {
    create() {
      const div = document.createElement('div');
      div.id = "picked"
      div.classList.add('picked-up-block')
      const overlay = document.createElement('div');
      overlay.classList.add('overlay')
      const span = document.createElement('span');
      span.innerText = this.title
      div.appendChild(overlay)
      div.appendChild(span)
      document.body.appendChild(div)
      const picked = document.getElementById("picked")
      document.addEventListener("mousemove", (ev) => {
        picked.style = `top: 0; left: 0; transform: translate(${ev.clientX + 40}px, ${ev.clientY + 40}px)`
      })
      this.editorStore.pickBlock({ component: this.component, icon: picked });
    }
  }
};
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