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
            <h2 class="container_title title">Добро пожаловать</h2>
            <span class="block_title title">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat, magna vel gravida pulvinar, purus nisl tempus mi, sed scelerisque lorem urna et lectus. Donec ac hendrerit odio, sed ullamcorper dui. In eget risus ligula. Morbi nec lacus varius, cursus ipsum ac, vestibulum nunc. Nulla bibendum semper diam, vel fringilla risus faucibus a. Vestibulum rhoncus nisl ac consequat bibendum. Suspendisse et convallis tellus. Etiam sit amet dictum neque.</span>
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

        const blob = packager.blob()

        const file = new File([blob], "index.html", {
          type: blob.type,
          lastModified: Date.now()
        });

        const convertToBase64 = (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
          });
        };

        convertToBase64(file).then(async (base64) => {
          result = await this.chooseDomainStore.saveIndex(parseInt(this.$route.params.id),
              base64.split('base64,')[1]);
        });

               if (result.success) {
          result = await this.chooseDomainStore.reloadNginx(parseInt(this.$route.params.id))
        } else {
          result.toastIfError(this.notificationStore, 'Возникла ошибка при попытке загрузить index.html');
          return;
        }

        if (result.success) {
          this.chooseDomainStore.closeModal()
        } else {
          result.toastIfError(this.notificationStore, 'Возникла ошибка при перезапуске nginx');
        }
      } else {
        result.toastIfError(this.notificationStore, 'Этот домен уже занят');
      }
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