<template>
  <EnvDashboardComponent>
    <template v-slot:header>
      <div class="page-header">
        <n-icon @click="goToDashboard" :component="ArrowBack"></n-icon>
        <h2 class="page-heading">Список окружений</h2>
      </div>
    </template>
    <template v-slot:content>
      <EnvListItemComponent v-for="env in envs" 
        :name="env.name"
        @click="goToEnv(env.id)"
         />
      <div class="plus">
        <n-icon :component="AddOutline" @click="goToCreate"></n-icon>
      </div>
    </template>
  </EnvDashboardComponent>

</template>

<script lang="ts">
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
import { AddOutline, ArrowBack } from '@vicons/ionicons5';
import EnvListItemComponent from '@/components/env/EnvListItemComponent.vue';
export default {
  name: "EnvListViewComponent",
  components: {
    EnvListItemComponent,
    EnvDashboardComponent,
  },
  computed: {
    AddOutline() {
      return AddOutline
    },
    ArrowBack() {
      return ArrowBack
    },
    envs() {
      return [
        { id: 1, name: 'test' },
        { id: 2, name: 'test' },
        { id: 3, name: 'test' },
        { id: 4, name: 'test' },
      ]
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push({path: "/dashboard"})
    },
    goToEnv(envId) {
      this.$router.push({path: `/envs/${envId}`})
    },
    goToCreate() {
      this.$router.push({path: `/envs/create`})
    }
  },
}
</script>

<style>
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

.plus {
  width: 5%;
  margin: 0 auto;
  color: #6f6c99;
  font-size: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid #b8b8c9;
  border-radius: 1rem;
}
</style>