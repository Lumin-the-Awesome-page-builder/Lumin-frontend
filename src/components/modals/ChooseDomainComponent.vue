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

export default defineComponent({
  name: "ChooseDomainComponent",
  data() {
    return {
      domain: "",
    }
  },
  methods:{
    save(){
      this.chooseDomainStore.setDomain(this.domain)
      this.chooseDomainStore.closeModal()
    }
  },
  setup() {
    const chooseDomainStore = useChooseDomainStore()

    return {
      chooseDomainStore
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