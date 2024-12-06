<template>
  <div class="header-wrapper">
    <div class="logo-wrapper">
      <img class="lumin-logo" src="@/assets/lumin-logo-1-1.svg" />
    </div>

    <n-divider style="height: 100%;" vertical />

    <div class="nav-group left">
      <div class="nav-element" @click="loadProjects">
        <n-icon>
          <Projects />
        </n-icon>
        Библиотека проектов
      </div>
      <div class="nav-element" @click="loadWidgets">
        <n-icon>
          <Widgets />
        </n-icon>
        Библиотека виджетов
      </div>
    </div>

    <n-divider style="height: 100%;" vertical />

    <div class="buttons-group">
      <n-button @click="createProject" color="#7b7bfe" ghost>
        <template #icon>
          <n-icon>
            <Create />
          </n-icon>
        </template>
        Создать
      </n-button>
      <n-button :disabled="disabledControls" @click="removeSelected" color="#fe7b9e">
        <template #icon>
          <n-icon>
            <Delete />
          </n-icon>
        </template>
        Удалить
      </n-button>
      <n-button :disabled="disabledControls" @click="downloadSelected" color="#7b7bfe">
        <template #icon>
          <n-icon>
            <Download />
          </n-icon>
        </template>
        Скачать
      </n-button>
    </div>

    <n-divider style="height: 100%;" vertical />

    <div class="nav-group right">
      <div class="nav-element disabled">
        <n-icon>
          <Store />
        </n-icon>
        Маркетплейс</div>
      <div class="nav-element disabled">
        <n-icon>
          <Backend />
        </n-icon>
        Backend</div>
      <div @click="logout" class="nav-element">
        <n-icon>
          <LogOut />
        </n-icon>
        Logout
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AddCircle as Create, CodeDownload as Download, Trash as Delete, AlbumsSharp as Projects, AppsSharp as Widgets, Basket as Store, Terminal as Backend, LogOut as LogOut } from '@vicons/ionicons5';
import useDashboardStore from '@/store/dashboard.store.ts'
import useEditorStore from '@/store/editor.store.ts'
import TokenUtil  from '@/utils/token.util.ts';
import router from '@/router';
import { useNotification } from 'naive-ui';

export default {
  components: {
    Create,
    Download,
    Delete,
    Projects,
    Widgets,
    Store,
    Backend,
    LogOut,
  },
  setup() {
    return {
      notificationStore: useNotification(),
      dashboardStore: useDashboardStore(),
      editorStore: useEditorStore(),
    }
  },
  async mounted() {
    await this.loadProjects()
  },
  methods: {
    logout() {
      TokenUtil.logout();
      router.push({ name: 'auth' });
    },
    async loadProjects() {
      const result = await this.dashboardStore.loadProjects()
      result.toastIfError(this.notificationStore);
    },
    async loadWidgets() {
      const result = await this.dashboardStore.loadWidgets()
      result.toastIfError(this.notificationStore);
    },
    async createProject() {
      const project = await this.editorStore.openNew()
      project.toastIfError(this.notificationStore);
      if (project.success)
        this.$router.push({ path: `/project/${project.getData().id}/edit` })
    },
    async removeSelected() {
      const results = await this.dashboardStore.removeSelected()
      results.forEach((result) => result.toastIfError(this.notificationStore));
    },
    async downloadSelected() {
      const results = await this.dashboardStore.downloadSelected()
      results.forEach((result) => result.toastIfError(this.notificationStore));
    }
  },
  computed: {
    disabledControls() {
      return !Object.keys(this.dashboardStore.selected).length
    }
  }
};
</script>

<style>
.header-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background: white;
  height: 70px;
  border-bottom: 1px solid #e2e2e8;
  color: #278158;
}
.logo-wrapper {
}
.nav-group {
    display: flex;
    align-items: center;
    color: #6f6c99;
    font-size: 18px;
    gap: 2rem;
    justify-content: space-between;
}
.left {
    width: 28vw;
}
.nav-element {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
}

.nav-element.disabled {
  color: #9d9cc5;
  cursor: default;
}

.buttons-group {
  display: flex;
  align-items: center;
  gap: 2rem;
}
</style>
