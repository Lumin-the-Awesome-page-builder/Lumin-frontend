<template>
  <n-message-provider>
    <n-modal
      v-model:show="projectStore.showModal"
      transform-origin="center"
      preset="card"
      style="width: 600px"
      @negative-click="cancelCallback"
    >
      <n-card
        :bordered="false"
        size="medium"
        role="dialog"
        aria-modal="true"
      >
        <div class="container">
          <div class="inputs_container">
            <h2 class="container_title title">Подтвержение удаления</h2>
            <span class="block_title title">Вы уверены, что хотите удалить {{ projectName }}?</span>
            <span class="block_title_bold title">Отменить это действие будет невозможно.</span>
            <n-button color="#FF356BA6" class="btn" @click="deleteProject">Удалить</n-button>
          </div>
        </div>
      </n-card>
    </n-modal>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useDeleteProjectModalStore } from '@/store/modals/delete-form-component.store.ts';

export default defineComponent({
  name: "DeleteFormComponent",
  setup() {
    return {
      projectStore: useDeleteProjectModalStore(),
    };
  },
  methods: {
    deleteProject() {
      this.projectStore.closeModal();
    },
    cancelCallback() {
      this.projectStore.closeModal();
    }
  },
  computed: {
    projectName() {
      return this.projectStore.project.name
    }
  }
});
</script>


<style scoped>

.inputs_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
}

.title {
  color: black;
  cursor: default;
}

.btn {
  width: 15rem;
  margin: 1.5rem;
}
</style>