<template>
  <EnvDashboardComponent>
    <template v-slot:header>
      <div class="page-header">
        <n-icon class="prev-arrow" @click="goToBack" :component="ArrowBack"></n-icon>
        <h2 class="page-heading">Форма "{{name}}"</h2>
      </div>
    </template>
    <template v-slot:content>
      <div class="controls">
        <div class="left-part">
          <p>Сортировка по дате</p>
          <n-date-picker v-model="startDate" type="date" placeholder="Дата с" />
          <n-date-picker v-model="endDate" type="date" placeholder="Дата до" />
        </div>
        <n-button @click="" color="#7b7bfe">Просмотреть</n-button>
      </div>
      <n-data-table :columns="columns" :data="tableData" class="custom-table"></n-data-table>
    </template>
  </EnvDashboardComponent>
</template>

<script lang="ts">
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
import { ArrowBack } from '@vicons/ionicons5';
import { NDataTable } from 'naive-ui'
import { useFormDataViewStore } from '@/store/form-data-view.store.ts';
import { useFormViewStore } from '@/store/form-view.store.ts';
export default {
  name: "FormViewData",
  components: { 'n-data-table': NDataTable },
  components: { EnvDashboardComponent },
  setup() {
    return {
      FormViewStore: useFormViewStore(),
      formDataStore: useFormDataViewStore()
    }
  },
  async created() {
    await this.FormViewStore.loadForms(parseInt(this.$route.params.id));
    console.log(this.FormViewStore.items, this.$route.params.formId)
    const form = this.FormViewStore.items.filter(el => el.id == this.$route.params.formId)[0]
    if (form.url_get && form.url_get.includes("lumin-api"))
      await this.formDataStore.loadData(form.url_get, null)
    else
      await this.formDataStore.loadData(null, form.id)
    await this.formDataStore.loadFields(this.$route.params.formId)
  },
  methods: {
    goToBack() {
      const projId = this.$route.params.id;
      this.$router.push({ path: `/project/${projId}/forms` });
    }
  },
  computed: {
    ArrowBack() {
      return ArrowBack;
    },
    columns() {
      return this.formDataStore.fields;
    },
    tableData() {
      return this.formDataStore.items;
    },
    name() {
      return this.FormViewStore.items.filter(el => el.id == this.$route.params.formId)[0].name;
    }
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      // columns: [
      //   { title: 'Имя', key: 'name' },
      //   { title: 'Возраст', key: 'age' },
      //   { title: 'Город', key: 'city' },
      // ],
      // tableData: [
      //   { name: 'Иван', age: 30, city: 'Москва' },
      //   { name: 'Анна', age: 25, city: 'Санкт-Петербург' },
      //   { name: 'Петр', age: 35, city: 'Екатеринбург' },
      // ],
    };
  },
}
</script>

<style>
.page-header {
  display: flex;
  flex-direction: row;
  color: black;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}

.page-heading {
  margin: 0;
}

.controls {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.left-part {
  width: 70%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}


.custom-table .n-table-header {
  background-color: #7b7bfe;
}

.custom-table .n-table-header th {
  color: white;
}

.custom-table .n-table-body td {
  color: black;
}
</style>
