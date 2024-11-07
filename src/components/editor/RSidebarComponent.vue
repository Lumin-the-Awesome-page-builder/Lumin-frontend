<template>
  <div class="sidebar-wrapper">
    <n-collapse>
      <n-collapse-item name="1">
        <template #header>
          <span class="custom-header">Параметры проекта</span>
        </template>
        <div class="btn-row">
          <n-button color="#7b7bfe" @click="save"> Сохранить </n-button>
          <n-button color="#7b7bfe" @click="exit"> Выйти </n-button>
        </div>
      </n-collapse-item>
      <n-collapse-item name="2">
        <template #header>
          <span class="custom-header">Параметры блока</span>
        </template>

        <ComponentSetupComponent />

        <div><n-button color="#7b7bfe"> Сохранить </n-button></div>
      </n-collapse-item>
    </n-collapse>
    <n-divider />
    <div class="block-options">
      <h3 class="options-heading">Опция блока №1</h3>
      <span class="options-details"> Детали опции </span>
      <n-button color="#7b7bfe"> Сохранить </n-button>
    </div>
    <n-divider />
  </div>
</template>

<script lang="ts">
import useEditorStore from '@/store/editor.store.ts';
import useProjectPreviewModalStore from '@/store/project-preview-modal.store.ts'
import { useNotification } from 'naive-ui';
import ComponentSetupComponent from '@/components/editor/ComponentSetupComponent.vue';

export default {
  components: {
    ComponentSetupComponent,
  },
  setup() {
    return {
      notificationStore: useNotification(),
      editorStore: useEditorStore(),
      projectPreviewModalStore: useProjectPreviewModalStore(),
    }
  },
  methods: {
    async save() {
      const result = await this.editorStore.save()
      result.toastIfError(this.notificationStore)
      return result;
    },
    async exit() {
      const result = await this.save()
      this.projectPreviewModalStore.closeModal()
      result.toastIfError(this.notificationStore)
      if (result.success) {
        this.$router.push({ path: '/dashboard' })
      }
    }
  }
};
</script>

<style scoped>
.sidebar-wrapper {
  background: white;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  max-width: 20vw;
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e2e2e8;
  gap: 1rem;
  padding: 0.5rem;
}
.block-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.custom-header {
  font-size: 20px;
  font-weight: bold;
  color: #353547;
}
.options-heading {
  font-size: 20px;
  font-weight: 600;
  color: #6f6c99;
}
.options-details {
  font-size: 18px;
  color: #6f6c99;
}
.btn-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}
</style>
