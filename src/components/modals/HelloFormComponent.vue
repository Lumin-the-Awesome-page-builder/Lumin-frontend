<template>
  <n-message-provider>
    <n-modal
      v-model:show="visible"
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
            <img src="../../assets/svg/Lumin_logo.svg" class="logo_svg" />
          </div>
          <div class="inputs_container">
            <h2 class="container_title title">Добро пожаловать!</h2>
            <span class="block_title title"
            >Мы рады Вас приветствовать на нашей платформе!</span
            >
            <n-button color="#3535FFA6" class="btn" @click="cancel"
            >Продолжить</n-button
            >
          </div>
        </div>
      </n-card>
    </n-modal>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useHelloFormStore from '@/store/modals/hello-form-component.store.ts';

export default defineComponent({
  name: 'HelloFormComponent',
  setup() {
    const helloFormStore = useHelloFormStore();
    helloFormStore.openModal();

    const visible = computed({
      get: () => helloFormStore.showModal,
      set: (value) => {
        if (!value) helloFormStore.closeModal();
      },
    });

    return { visible, helloFormStore };
  },
  methods: {
    cancel() {
      console.log('Кнопка нажата!');
      this.helloFormStore.closeModal();
    },
  },
});
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