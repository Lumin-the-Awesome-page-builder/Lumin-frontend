<template>
  <EnvDashboardComponent>
    <template v-slot:header>
      <div class="page-header">
        <n-icon class="prev-arrow" @click="goToBack" :component="ArrowBack"></n-icon>
        <h2 class="page-heading">Формы</h2>
      </div>
    </template>
    <template v-slot:content>
      <form-item-component
        v-for="item in items"
        :key="item.id"
        :item="item"
        :name="item.name"
      ></form-item-component>
    </template>
  </EnvDashboardComponent>
</template>

<script lang="ts">
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
import { ArrowBack } from '@vicons/ionicons5';
import FormItemComponent from '@/components/formItemComponent.vue';
import { useFormViewStore } from '@/store/form-view.store.ts';


export default {
  name: "FormView",
  computed: {
    ArrowBack() {
      return ArrowBack
    },
    items() {
      return this.FormViewStore.getItems;
    }
  },
  components: { FormItemComponent, EnvDashboardComponent },
  methods: {
    goToBack() {
      const projId = this.$route.params.projId;
      this.$router.push({ path: `/project/${projId}/edit` });
    }
  },
  data() {
    return {
      FormViewStore: useFormViewStore(),
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
</style>