<template>
  <EnvDashboardComponent
    title=""
  > 
    <template v-slot:header>
      <div class="page-header">
          <n-icon :component="ArrowBack"></n-icon>
          <h2 class="page-heading">Создание окружения</h2>
      </div>
    </template>

    <template v-slot:content>
      <n-input class="search-input" placeholder="Введите название окружения" v-model:value="name">
        <template #prefix>
          <n-icon :component="Pencil" color="#6F6C99" />
        </template>
      </n-input>
    </template>

  </EnvDashboardComponent>
</template>


<script lang="ts">
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
import { Pencil, ArrowBack } from '@vicons/ionicons5';

export default {
    name: "CreateEnvView",
    components: {
      EnvDashboardComponent
    }, 
    data: () => ({
      Pencil: shallowRef(Pencil),
      ArrowBack: shallowRef(ArrowBack),
      name: ""
    })
}

</script>

<style>

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


.dashboard {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #f4f4f4;
    width: 100vw;
    height: 100vh;
    justify-content: space-between
}

.footer {
  width: 100%;
  height: 6vh;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.footerText {
  margin-left: 1.5rem;
}

</style>