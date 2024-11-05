<template>
  <n-message-provider>
    <n-modal
      v-model:show="HelloFormStore.showModal"
      transform-origin="center"
      preset="card"
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
              <img src="@/assets/svg/Lumin_logo.svg" class="logo_svg">
            </div>
            <div class="inputs_container">
              <h2 class="container_title title">Добро пожаловать!</h2>
              <span class="block_title title">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat, magna vel gravida pulvinar, purus nisl tempus mi, sed scelerisque lorem urna et lectus. Donec ac hendrerit odio, sed ullamcorper dui. In eget risus ligula. Morbi nec lacus varius, cursus ipsum ac, vestibulum nunc. Nulla bibendum semper diam, vel fringilla risus faucibus a. Vestibulum rhoncus nisl ac consequat bibendum. Suspendisse et convallis tellus. Etiam sit amet dictum neque.</span>
              <n-button color="#3535FFA6" class="btn" @click="cancelForm">Продолжить</n-button>
            </div>
          </div>
      </n-card>
    </n-modal>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHelloFormStore } from '@/store/hello-form-component.store.ts';

export default defineComponent({
  name: "HelloFormComponent",
  setup() {
    const HelloFormStore = useHelloFormStore()

    const cancelForm = () => {
      HelloFormStore.closeModal();
    };

    return {
      HelloFormStore,
      cancelForm
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

.btn {
  width: 15rem;
  margin: 1.5rem;
}

.logo_svg {
  width: 8rem;
}
</style>