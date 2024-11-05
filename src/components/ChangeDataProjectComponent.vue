<template>
  <n-message-provider>
    <n-modal
      v-model:show="ChangeDataStore.showModal"
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
          <div class="inputs_container">
            <h2 class="container_title title">Изменение данных</h2>
            <span class="user_title title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            <span class="user_title title">Fusce placerat, magna vel gravida pulvinar</span>
            <div class="inputBlock">
              <h3 class="title inputBlockText">Название</h3>
              <n-input placeholder="Проект 1" v-model:value="projectName" type="text" class="input"></n-input>
            </div>
            <div class="inputBlock">
              <h3 class="title inputBlockText">Категория</h3>
              <n-input placeholder="Сайт" v-model:value="category" type="text" class="input"></n-input>
            </div>
            <div class="inputBlock">
              <h3 class="title inputBlockText">Теги</h3>
              <n-input placeholder="Лендинг" v-model:value="tags" type="text" class="input"></n-input>
            </div>
            <n-button color="#3535FFA6" class="btn" @click="saveForm">Сохранить</n-button>
          </div>
        </div>
      </n-card>
    </n-modal>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useChangeDataStore } from '@/store/change-data-project-component.store.ts';

export default defineComponent({
  name: "changeDataComponent",
  data() {
    return {
      projectName: "",
      category: "",
      tags: ""
    }
  },
  setup() {
    const ChangeDataStore = useChangeDataStore()

    return {
      ChangeDataStore
    }
  },

  methods: {
    saveForm() {
      this.ChangeDataStore.setProjectName(this.projectName)
      this.ChangeDataStore.setCategory(this.category)
      this.ChangeDataStore.setTags(this.tags)
      this.ChangeDataStore.closeModal()
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

.user_title{
  color: #6F6C99;

}

.input {
  width: 15rem;
}


.btn {
  width: 15rem;
  margin: 1.5rem;
}

.inputBlock {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
}

.inputBlockText {
  color: #3535478C;
}

</style>