<template>
  <EnvDashboardComponent>
    <template v-slot:header>
      <div class="page-header">
        <n-icon :component="ArrowBack"></n-icon>
        <h2 class="page-heading">Список окружений</h2>
      </div>
    </template>
    <template v-slot:content>
      <EnvListItemComponent name="test"></EnvListItemComponent>
      <EnvListItemComponent></EnvListItemComponent>
      <EnvListItemComponent></EnvListItemComponent>
      <EnvListItemComponent></EnvListItemComponent>
      <EnvListItemComponent></EnvListItemComponent>
      <div class="plus">
        <n-icon :component="AddOutline"></n-icon>
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
  computed: {
    AddOutline() {
      return AddOutline
    },
    ArrowBack() {
      return ArrowBack
    }
  },
  components: {
    EnvListItemComponent,
    EnvDashboardComponent,

  }
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