<template>
  <div class="sidebar-wrapper">
    <ChooseDomainComponent />
    <ChangeDataComponent />
    <ChangeProjectSharingSettings />
    <n-collapse :default-expanded-names="['1']">
      <n-collapse-item name="1">
        <template #header>
          <span class="custom-header">Параметры проекта</span>
        </template>
        <div class="heading-row">
          <h3 class="options-heading">Управление</h3>
          <p class="options-details">
            При выходе все изменения в проекте автоматически сохраняются.
          </p>
          <div class="btn-row">
            <n-button color="#7b7bfe" @click="save"> Сохранить </n-button>
            <n-button color="#7b7bfe" @click="exit"> Выйти </n-button>
          </div>
        </div>
        <n-divider />
        <div class="heading-row">
          <h3 class="options-heading">Управление Формами</h3>
          <p class="options-details">
            Перейти в раздел управления формами.
          </p>
          <div class="btn-row">
            <n-button color="#7b7bfe" @click="redirectToForm"> Перейти </n-button>
          </div>
        </div>
        <n-divider />
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
        <n-divider />
        <div class="heading-row">
          <h3 class="options-heading">Управление доступом</h3>
          <p class="options-details">
            <span class="options-details-subheading">Совместное редактирование: </span> {{ collaborationText }}
          </p>
          <p class="options-details">
            <span class="options-details-subheading">Доступен на маркетплейсе: </span> {{ marketplaceText }}
          </p>
          <n-button color="#7b7bfe" @click="editShareSettings">Изменить параметры доступа</n-button>
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
      
      <n-collapse-item name="4">
        <template #header>
          <span class="custom-header">Доступные виджеты</span>
        </template>
        
        <AvailableWidgetsComponent />
      
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
import useDashboardStore from '@/store/dashboard.store.ts';
import { useChooseDomainStore } from '@/store/modals/choose-domen-component.store.ts';
import ChooseDomainComponent from '@/components/modals/ChooseDomainComponent.vue';
import ChangeDataComponent from '@/components/modals/ChangeProjectDataComponent.vue';
import ComponentSetupComponent from '@/components/editor/ComponentSetupComponent.vue';
import AvailableBlocksComponent from '@/components/editor/AvailableBlocksComponent.vue';
import AvailableWidgetsComponent from '@/components/editor/AvailableWidgetsComponent.vue';
import ChangeProjectSharingSettings from '@/components/modals/ShareProjectModal.vue';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import useChangeProjectSharingSettingsStore from '@/store/modals/change-project-share-settings-component.store.ts';

export default <any> {
  components: {
    ChangeProjectSharingSettings, ComponentSetupComponent, AvailableBlocksComponent, ChangeDataComponent, ChooseDomainComponent, AvailableWidgetsComponent
  },
  setup() {
    return {
      notificationStore: useNotification(),
      editorStore: useEditorStore(),
      dashboardStore: useDashboardStore(),
      projectPreviewModalStore: useProjectPreviewModalStore(),
      changeProjectDataStore: useChangeDataStore(),
      changeProjectSharingSettingStore: useChangeProjectSharingSettingsStore(),
      chooseDomainStore: useChooseDomainStore(),
      componentSetupStore: useComponentSetupStore(),
    }
  },
  computed: {
    project() {
      return this.editorStore.getProject;
    },
    projectName() {
      if (this.project)
        return this.project.name
      else
        return ""
    },
    projectCategory() {
      if (this.project)
        return this.project.category_name;
      else
        return ""
    },
    projectTags() {
      if (this.project)
        return `#${this.project.tags.join(" #")}`
      else
        return ""
    },
    availableBlocks() {
      if (this.project)
        return this.editorStore.getAvailableBlocks;
    },
    collaborationText() {
      if (this.project)
        return this.changeProjectSharingSettingStore.collaboration ? "Включено" : "Отключено";
    },
    marketplaceText() {
      if (this.project)
        return this.changeProjectSharingSettingStore.marketplace ? "Да" : "Нет";
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
      await this.editorStore.saveForms();
      const result = await this.editorStore.save()
      result.toastIfError(this.notificationStore)
      return result;
    },
    async exit() {
      let result = await this.save()
      this.editorStore.ws.closeEditing();
      this.projectPreviewModalStore.closeModal()
      result.toastIfError(this.notificationStore)
      if (result.success) {
        this.editorStore.clearBlockSelection()
        result = await this.editorStore.updatePreview()
        result.toastIfError(this.notificationStore)
        result = await this.dashboardStore.loadProjects()
        result.toastIfError(this.notificationStore)
        this.$router.push({ path: '/dashboard' })
      }
    },
    publish() {
      this.chooseDomainStore.openModal()
    },
    download() {
      const packager = new Packager(this.editorStore.app)
      const app = getEditorInstance()
      app.initState = JSON.parse(packager.json())
      packager.app = app
      
      const blob = packager.blob()

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'index.html';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    redirectToForm(){
      const id = this.$route.params.id;
      this.$router.push({ path: `/project/${id}/forms` })
    },
    editData() {
      this.changeProjectDataStore.openModal({
        ...this.editorStore.getProject
      })
    },
    editShareSettings() {
      this.changeProjectSharingSettingStore.openModal({
        id: this.project.id,
        shared: this.project.shared,
        shared_marketplace: this.project.shared_marketplace,
      })
    }
  },
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
  flex-direction: column;
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
.heading-row button {
  width: fit-content;
}
.btn-row {
  display: flex;
  flex-direction: row;
  justify-content: start;
  column-gap: 2rem;
  width: 100%;
}
</style>
