<template>
  <EnvDashboardComponent> 
    <template v-slot:header>
      <div class="page-header">
          <n-icon class="prev-arrow" @click="goToEnvList" :component="ArrowBack"></n-icon>
          <h2 class="page-heading">Создание окружения</h2>
      </div>
    </template>

    <template v-slot:content>
      <n-input class="search-input" placeholder="Введите название окружения" v-model:value="createEnvStore.name">
        <template #prefix>
          <n-icon :component="Pencil" color="#6F6C99" />
        </template>
      </n-input>

      <div class="btns">
        <div class="switch-type-btns">
          <!-- killed -->
          <n-button v-if="conf" @click="switchToConf" color="#7b7bfe">
            Использовать готовую конфигурацию
          </n-button>
          <n-button v-else @click="switchToConf" color="#7b7bfe" ghost>
            Использовать готовую конфигурацию
          </n-button>
          <n-button v-if="!conf" @click="switchToPure" color="#7b7bfe">
            Создать новую конфигурацию
          </n-button>
          <n-button v-else @click="switchToPure" color="#7b7bfe" ghost>
            Создать новую конфигурацию
          </n-button>
        </div>

        <div class="save-btn">
          <n-button @click="saveEnv" color="#7b7bfe">
            Создать окружение
          </n-button>
        </div>
      </div>

      <CreateEnvFromConfiguration v-if="conf" />
      <CreatePureEnv v-else />

    </template>

  </EnvDashboardComponent>
</template>


<script lang="ts">
import CreateEnvFromConfiguration from '@/components/env/CreateEnvFromConfiguration.vue';
import CreatePureEnv from '@/components/env/CreatePureEnv.vue';
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
import useCreateEnvStore from '@/store/create-env.store';
import { Pencil, ArrowBack } from '@vicons/ionicons5';

export default {
    name: "CreateEnvView",
    components: {
      EnvDashboardComponent,
      CreateEnvFromConfiguration,
      CreatePureEnv
    },
    setup() {
      return {
        createEnvStore: useCreateEnvStore()
      }
    },
    data: () => ({
      Pencil: shallowRef(Pencil),
      ArrowBack: shallowRef(ArrowBack),
      name: "",
      conf: true
    }),
    async created() {
      const loaded = await this.createEnvStore.loadConfigurations()
      if (!loaded.success) {
        console.log("LAOD FAILED");
      }
    },
    methods: {
      goToEnvList() {
        this.$router.push({ path: "/envs" })
      },
      async saveEnv() {
        const created = await this.createEnvStore.createConfiguration();
        console.log(created)
        if (created[1].success) {
          this.$router.push({ path: `/envs` });
        }
      },
      switchToConf() {
        this.conf = true;
        console.log("conf")
      },
      switchToPure() {
        this.conf = false;
        console.log("pure")
      }
    }
}

</script>

<style>
.prev-arrow {
  font-size: 20px;
  cursor: pointer;
}

.content-wrapper {
  width: 100%;
  gap: 1rem;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
}

.search-input {
  padding: .3rem;
  border-radius: 10px;
}

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

.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.switch-type-btns {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-around;
  width: auto;
}

.save-btn {
  display: flex;
}

</style>