<template>
  <EnvDashboardComponent>
    <template v-slot:header>
      <div class="page-header">
        <n-icon :component="ArrowBack"></n-icon>
        <h2 class="page-heading">Список контейнеров</h2>
      </div>
    </template>
    <template v-slot:content>
      <div class="head-block-container">
        <p class="head-block-container-text">Название</p>
        <p class="head-block-container-text">Статус</p>
        <p class="head-block-container-text">Операции</p>
      </div>
      <EnvContainerListItemComponent name="test" status="ok"></EnvContainerListItemComponent>
      <EnvContainerListItemComponent name="test" status="ok"></EnvContainerListItemComponent>
      <EnvContainerListItemComponent name="test" status="ok"></EnvContainerListItemComponent>
      <EnvContainerListItemComponent name="test" status="ok"></EnvContainerListItemComponent>
      <EnvContainerListItemComponent name="test" status="ok"></EnvContainerListItemComponent>
    </template>
  </EnvDashboardComponent>
</template>

<script lang="ts">
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
import { ArrowBack } from '@vicons/ionicons5';
import EnvContainerListItemComponent from '@/components/env/EnvContainerListItemComponent.vue';

export default {
  name: 'EnvView',
  computed: {
    ArrowBack() {
      return ArrowBack;
    },
  },
  components: { EnvContainerListItemComponent, EnvDashboardComponent },
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