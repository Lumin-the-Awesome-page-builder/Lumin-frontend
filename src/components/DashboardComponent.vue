<template>
  <div class="content-wrapper">
    <div class="page-header">
      <h2 class="page-heading">Ваши {{ header }}</h2>
      <span class="prj-count">{{ projectCount }} {{ projectLabel }}</span>
    </div>
    
    <n-input class="search-input" placeholder="Введите фразу для поиска...">
      <template #prefix>
        <n-icon :component="Search" color="#6F6C99" />
      </template>
    </n-input>
    
    <CardGrid :data="data" type="default" />
  </div>
</template>

<script lang="ts">
import CardGrid from '@/components/CardGrid.vue';
import { Search } from '@vicons/ionicons5';
import useDashboardStore from '@/store/dashboard.store.ts'

export default {
  components: { CardGrid },
  setup() {
    return {
      dashboardStore: useDashboardStore()
    }
  },
  data: () => ({
    Search,
  }),
  computed: {
    data() {
      return this.dashboardStore.getData
    },
    projectCount() {
      return this.data.length;
    },
    header() {
      return (this.dashboardStore.getType == "project") ? 'проекты' : 'виджеты';
    },
    projectLabel() {
      const count = this.projectCount;
      if (count % 10 === 1 && count % 100 !== 11) {
        return (this.dashboardStore.getType == "project") ? 'проект' : 'виджет';
      } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
        return (this.dashboardStore.getType == "project") ? 'проекта' : 'виджета';
      } else {
        return (this.dashboardStore.getType == "project") ? 'проектов' : 'виджетов';
      }
    }
  }
}

</script>

<style scoped>

.content-wrapper {
  width: 100%;
  gap: 1rem;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
}

.search-input {
  border-radius: 10px;
}

.page-header {
  display: flex;
  flex-direction: row;
  color: black;
  align-items: center;
  gap: 2rem;
  margin: 1rem;
}


.page-heading {
  margin: 0;
}

.prj-count {
  color: rgba(53, 53, 71, 0.49);
  font-size: 12px;
  font-weight: 400;
  padding-top: 5px;
}
</style>