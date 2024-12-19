<template>
  <EnvDashboardComponent>
    <template v-slot:header>
      <div class="page-header">
        <n-icon
          class="prev-arrow"
          @click="goToBack"
          :component="ArrowBack"
        ></n-icon>
        <h2 class="page-heading">Формы</h2>
      </div>
    </template>
    <template v-slot:content>
      <form-item-component
        v-for="item in items"
        :key="item.id"
        :item="item"
        :name="item.name"
        @click="goToFormData(item.id)"
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
  created() {
    this.FormViewStore.loadForms(parseInt(this.$route.params.id));
  },
  methods: {
    goToBack() {
      const projId = this.$route.params.id;
      this.$router.push({ path: `/project/${projId}/edit` });
    },
    goToFormData(id) {
      const projId = this.$route.params.id;
      this.$router.push({ path: `/project/${projId}/forms/${id}` });
      //"GET /lumin/form/ID/data"
      /*
      * [{ data: "JSON" }]
      * {"input-name":"123"}
      * */

      //"GET /lumin/form/ID/fields"
      /*
      [{"type":"text","name":"input-name"},{"type":"button","name":"input-name","text":"Tet"}]
      * [{ data: "JSON" }]
      * */
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