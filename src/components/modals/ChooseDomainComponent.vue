<template>
  <n-message-provider>
    <n-modal
      v-model:show="chooseDomainStore.showModal"
      transform-origin="center"
      style="width: 600px"
      preset="card"
    >
      <n-card
        :bordered="false"
        size="medium"
        role="dialog"
        aria-modal="true"
      >
        <div class="container">
          <div class="logo">
            <img src="../../assets/svg/Lumin_logo.svg" class="logo_svg">
          </div>
          <div class="inputs_container">
            <h2 class="container_title title">Настройки публикации</h2>
            <div class="partInput">
              <n-input  v-model:value="domain" placeholder="subdomain" type="text" class="input"></n-input>
              <n-p class="postfixText">.dudosyka.ru</n-p>
            </div>
            <n-button color="#3535FFA6" class="btn" @click="save">Сохранить</n-button>
          </div>
        </div>
      </n-card>
    </n-modal>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useChooseDomainStore } from '@/store/modals/choose-domen-component.store.ts';
import ApiResponseDto from "@/api/dto/api-response.dto.ts";
import Packager from "@/editor/core/Packager.ts";
import {getEditorInstance} from "@/editor/plugin.ts";
import useEditorStore from "@/store/editor.store.ts";
import {useNotification} from "naive-ui";

export default defineComponent({
  name: "ChooseDomainComponent",
  data() {
    return {
      domain: "",
    }
  },
  setup() {
    const chooseDomainStore = useChooseDomainStore()

    return {
      chooseDomainStore,
      editorStore: useEditorStore(),
      notificationStore: useNotification(),
    }
  },
  created() {
    if (!this.editorStore.getProject) return
    if (this.editorStore.getProject.domain_name) {
      this.domain = this.editorStore.getProject.domain_name
    }
  },
  methods:{
    async save(){
      this.chooseDomainStore.setDomain(this.domain)
      let result: ApiResponseDto<String> = await this.chooseDomainStore.save(parseInt(this.$route.params.id));
      if (result.success) {
        const forms = await this.editorStore.saveForms();
        await Promise.all(forms.map(async el => {
          await this.componentSetupStore.patchTree(el.component);
        }));
        const packager = new Packager(this.editorStore.app)
        const app = getEditorInstance()
        app.initState = JSON.parse(packager.json())
        packager.app = app

        await packager.base64().then(async (base64) => {
          result = await this.chooseDomainStore.saveIndex(parseInt(this.$route.params.id),
              base64.split('base64,')[1]);
        });

        if (result.success) {
          this.editorStore.selected = {...this.editorStore.selected, domain_name: this.domain}
          this.chooseDomainStore.closeModal()
        } else {
          result.toastIfError(this.notificationStore, 'Возникла ошибка при перезапуске nginx');
        }
      } else {
        result.toastIfError(this.notificationStore, 'Этот домен уже занят');
      }
    }
  },
  computed: {
    visible() {
      return this.chooseDomainStore.showModal
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inputs_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: black;
  cursor: default;
}

.input {
  margin-top: 1rem;
  width: 15rem;
}

.logo_svg {
  width: 8rem;
}

.btn {
  width: 15rem;
  margin: 1.5rem;
}

.partInput {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.postfixText {
  margin-left: 0.3rem;
  color: #3535478C;
  font-size: 1.3rem;


}
</style>