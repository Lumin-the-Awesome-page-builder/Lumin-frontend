<template>
    <EnvDashboardComponent> 
      <template v-slot:header>
        <div class="page-header">
            <n-icon class="prev-arrow" @click="goToEnv" :component="ArrowBack"></n-icon>
            <h2 class="page-heading">Контейнер "{{ name }}"</h2>
        </div>
      </template>
  
      <template v-slot:content>
        <div class="status-bar">
            <div class="logs-title">
                <span class="text">Логи</span>
            </div>

            <div class="btns-row">
                <div class="text">
                    Статус: {{ status }}
                </div>

                <n-button v-if="started" @click="stopContainer" color="#7b7bfe">
                    <template #icon>
                        <n-icon :component="Stop" />
                    </template>
                    Остановить
                </n-button>
                <n-button v-else @click="startContainer" color="#7b7bfe">
                    <template #icon>
                        <n-icon :component="Play" />
                    </template>
                    Запустить
                </n-button>
            </div>
        </div>

        
        <Codemirror
            readonly
            v-model:value="logs"
            :options="cmOptions"
            class="cm-component"
            height="800px"
            width="100%" />
      </template>
  
    </EnvDashboardComponent>
  </template>
  
  
<script lang="ts">
    import Codemirror from "codemirror-editor-vue3";
    import "codemirror/addon/display/placeholder";

  import CreateEnvFromConfiguration from '@/components/env/CreateEnvFromConfiguration.vue';
  import CreatePureEnv from '@/components/env/CreatePureEnv.vue';
  import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';
  import { ArrowBack, Play, Stop } from '@vicons/ionicons5';
  
  export default {
      name: "CreateEnvView",
      components: {
        EnvDashboardComponent,
        CreateEnvFromConfiguration,
        CreatePureEnv,
        Codemirror
      }, 
      data: () => ({
        Play: shallowRef(Play),
        Stop: shallowRef(Stop),
        ArrowBack: shallowRef(ArrowBack),
        started: false,
        cmOptions: { 
            mode: "text",
            readOnly: true,
            readonly: true,
        },
      }),
      computed: {
        name() {
            return "Container"
        },
        status() {
            return "Exit(1)"
        },
        logs() {
            return `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis animi ipsam cupiditate quos eveniet ratione? In enim architecto atque, vitae sit deserunt dolorum, voluptates error dignissimos similique, ullam veritatis! Enim.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ut sapiente commodi atque. Consectetur, molestias commodi! Eveniet porro quasi vel id quidem, sapiente nobis accusamus magni rerum? Voluptate, sed cum?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestias cum hic error omnis vero a voluptates praesentium repudiandae sunt, architecto, voluptas nostrum iure doloribus. Voluptatem magni quas deleniti nesciunt.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil omnis beatae optio ipsum ratione corporis! Quas ab qui similique numquam nemo aliquid dolorem autem consectetur fugiat, quaerat cum? Sequi, amet.`;
        }
      },
      methods: {
        goToEnv() { 
            const envId = this.$route.params.envId;
            this.$router.push({ path: `/envs/${envId}` });
        },
        startContainer() {
            console.log("started")
            this.started = true;
        },
        stopContainer() {
            console.log("stopped")
            this.started = false;
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
  
  .status-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .btns-row {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  .text {
    color: rgba(53, 53, 71, 0.69);
    font-size: 12px;
    font-weight: 400;
  }

  .logs-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logs-title > .text {
    font-size: 18px;
  }
  </style>