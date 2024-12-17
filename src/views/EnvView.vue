<template>
  <EnvDashboardComponent>
    <template v-slot:header>
      <div class="page-header">
        <n-icon @click="goToEnvList" :component="ArrowBack"></n-icon>
        <h2 class="page-heading">Список контейнеров</h2>
      </div>
    </template>
    <template v-slot:content>
      <div class="head-block-container">
        <p class="head-block-container-text">Название</p>
        <p class="head-block-container-text">Статус</p>
        <p class="head-block-container-text">Операции</p>
      </div>
      <EnvContainerListItemComponent v-for="container in containers" 
        @click="goToContainer(container.id)" 
        :name="container.name" 
        :status="container.status" />
    </template>
  </EnvDashboardComponent>
</template>

<script lang="ts">
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
import { ArrowBack } from '@vicons/ionicons5';
import EnvContainerListItemComponent from '@/components/env/EnvContainerListItemComponent.vue';

export default {
  name: 'EnvView',
  components: { EnvContainerListItemComponent, EnvDashboardComponent },
  computed: {
    ArrowBack() {
      return ArrowBack;
    },
    containers() {
      return [
        { id: 1, name: "test", status: "ok" },
        { id: 2, name: "test", status: "ok" },
        { id: 3, name: "test", status: "ok" },
        { id: 4, name: "test", status: "ok" },
      ]
    }
  },
  methods: {
    goToEnvList() {
      this.$router.push({path: "/envs"});
    },
    goToContainer(containerId) {
      const envId = this.$route.params.envId;
      this.$router.push({path: `/envs/${envId}/container/${containerId}`});
    }
  }
};
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

.head-block-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 31%;
  padding-left: 1rem;
}

.head-block-container-text {
  color: #9e9cc3;
}
</style>