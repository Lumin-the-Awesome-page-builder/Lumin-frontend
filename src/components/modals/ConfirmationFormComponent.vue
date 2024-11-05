<template>
  <n-message-provider>
    <n-modal
      v-model:show="confirmationStore.showModal"
      transform-origin="center"
      style="width: 600px"
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
            <h2 class="container_title title">Подтверждение</h2>
            <n-p class="user_title title">Только для нового пользователя</n-p>
            <span class="block_title title">На вашу почту было отправлено письмо с кодом подтверждения.</span>
            <span class="block_title title">Введите его ниже:</span>
            <n-input  v-model="emailData" placeholder="123-456-789" type="text" class="input">
              <template #prefix>
                <img src="../../assets/svg/email.svg" class="imgLogin"/>
              </template>
            </n-input>
            <n-button color="#3535FFA6" class="btn" @click="cancel">Войти</n-button>
          </div>
        </div>
      </n-card>
    </n-modal>
  </n-message-provider>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useConfirmationStore } from '@/store/modals/confirmation-form-component.store.ts';

export default defineComponent({
  name: "ConfirmationFormComponent",
  data() {
    return {
      emailData: {
        default: "",
      }
    }
  },
  setup() {
    return {
      confirmationStore: useConfirmationStore()
    }
  },
  methods: {
    cancel() {
      this.confirmationStore.closeModal();
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
  height: 90%;
}

.title {
  color: black;
  cursor: default;
}

.user_title{
  color: #6F6C99;

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
</style>