<template>
  <div class="sidebar-wrapper">
    <ChooseDomainComponent />
    <ChangeDataComponent />
    <n-collapse>
      <n-collapse-item name="1">
        <template #header>
          <span class="custom-header">Параметры проекта</span>
        </template>
        <div class="btn-row">
          <n-button color="#7b7bfe" @click="save"> Сохранить </n-button>
          <n-button color="#7b7bfe" @click="exit"> Выйти </n-button>
        </div>
        <div class="heading-row">
          <h3 class="options-heading">Публикация</h3>
          <p class="options-details">
            Сайт опубликован на хостинге с адресом example.com. Хотите разместить в нашей системе?
          </p>
          <n-button color="#7b7bfe" @click="publish">Опубликовать</n-button>
        </div>
        <n-divider />
        <div class="heading-row">
          <h3 class="options-heading">Скачать</h3>
          <p class="options-details">
            Вы можете скачать сайт архивом
          </p>
          <n-button color="#7b7bfe" @click="download">Скачать</n-button>
        </div>
        <n-divider />
        <div class="heading-row">
          <h3 class="options-heading">Основные данные</h3>
          <p class="options-details">
            <span class="options-details-subheading">Название: </span> {{ projectName }}
          </p>
          <p class="options-details">
            <span class="options-details-subheading">Категория: </span> {{ projectCategory }}
          </p>
          <p class="options-details">
            <span class="options-details-subheading">Теги: </span> {{ projectTags }}
          </p>
          <n-button color="#7b7bfe" @click="editData">Изменить данные</n-button>
        </div>
      </n-collapse-item>
      <n-collapse-item name="2">
        <template #header>
          <span class="custom-header">Параметры блока</span>
        </template>
        
        <ComponentSetupComponent :key="test" />

      </n-collapse-item>
      <n-collapse-item name="3">
        <template #header>
          <span class="custom-header">Доступные блоки</span>
        </template>
        
        <AvailableBlocksComponent :blocks="availableBlocks" />

      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script lang="ts">
import useEditorStore from '@/store/editor.store.ts';
import useProjectPreviewModalStore from '@/store/project-preview-modal.store.ts'
import { useNotification } from 'naive-ui';
import { getEditorInstance } from '@/editor/plugin.ts';
import Packager from '@/editor/core/Packager.ts';
import useChangeDataStore from '@/store/modals/change-data-project-component.store.ts';
import { useChooseDomainStore } from '@/store/modals/choose-domen-component.store.ts';
import ChooseDomainComponent from '@/components/modals/ChooseDomainComponent.vue';
import ChangeDataComponent from '@/components/modals/ChangeProjectDataComponent.vue';
import ComponentSetupComponent from '@/components/editor/ComponentSetupComponent.vue';
import AvailableBlocksComponent from '@/components/editor/AvailableBlocksComponent.vue';
import useComponentSetupStore from '@/store/component-setup.store.ts';

export default {
  components: {
    ComponentSetupComponent, AvailableBlocksComponent, ChangeDataComponent, ChooseDomainComponent
  },
  setup() {
    return {
      notificationStore: useNotification(),
      editorStore: useEditorStore(),
      projectPreviewModalStore: useProjectPreviewModalStore(),
      changeProjectDataStore: useChangeDataStore(),
      chooseDomainStore: useChooseDomainStore(),
      componentSetupStore: useComponentSetupStore(),
    }
  },
  computed: {
    project() {
      return this.editorStore.getProject;
    },
    projectName() {
      return this.project.name
    },
    projectCategory() {
      return this.project.category_id;
    },
    projectTags() {
      return `#${this.project.tags.join(" #")}`
    },
    availableBlocks() {
      return this.editorStore.getAvailableBlocks;
    }
  },
  data: () => ({
    test: 123
  }),
  mounted() {
    this.componentSetupStore.$onAction(({name, after}) => {
      //Force refresh the ComponentSetup
      if (name === 'selectComponent') {
        after(() => {
          this.$nextTick(() => {
            this.test += 1
          })
        })
      }
    })
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
        this.editorStore.clearBlockSelection()
        this.$router.push({ path: '/dashboard' })
      }
    },
    publish() {
      this.chooseDomainStore.openModal()
    },
    download() {
      const app = getEditorInstance()
      app.initState = JSON.parse(this.data.data);
      const packager = new Packager(app)
      
      const blob = packager.blob()
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'index.html';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
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
  padding-right: 2rem;
}
.custom-header {
  font-size: 20px;
  font-weight: bold;
  color: #353547;
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
