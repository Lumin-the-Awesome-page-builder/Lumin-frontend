<template>
  <n-message-provider>
    <n-modal
      v-model:show="changeDataStore.showModal"
      transform-origin="center"
      style="width: 600px"
      preset="card"
      @negative-click="cancelCallback"
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
            <span class="user_title title">В данном разделе возможна смена параметров проекта</span>
            <span class="user_title title">Если поле не запролнить, но значение останется прежним</span>
            <div class="inputBlock">
              <h3 class="title inputBlockText">Название</h3>
              <n-input placeholder="Проект 1" v-model:value="projectName" type="text" class="input"></n-input>
            </div>
            <div class="inputBlock">
              <h3 class="title inputBlockText">Категория</h3>
              <n-dropdown type="divider" trigger="click" :menu-props="menuProps" :options="options" class="input" @select="handleSelect">
                <n-button class="btn" id="hover-btn">Выберите категорию</n-button>
              </n-dropdown>
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
import useChangeDataStore from '@/store/modals/change-data-project-component.store.ts';
import useEditorStore from '@/store/editor.store.ts';
import { ref } from 'vue';
import LibraryModel from '@/api/modules/library/models/library.model.ts';

export default defineComponent({
  name: "changeDataComponent",
  data() {
    return {
      projectName: "",
      category: "",
      tags: "",
      menuProps: () => ({
        style: {
          width: '15rem',
          textAlign: 'center',
        },
        placement: 'bottom-end'
      })
    }
  },
  setup() {
    const changeDataStore = useChangeDataStore()
    const editorStore = useEditorStore()
    const showDropdownRef = ref(false)
    return {
      changeDataStore,
      editorStore,
      showDropdown: showDropdownRef,
      categories: [],
      handleSelect(key: string | number) {
        const el = document.getElementById('hover-btn')
        el.innerText = key
        el.setAttribute('style', 'border: 1px solid rgb(225, 225, 227);')
      },
      options: [
        {
          label: 'Категории не найдены',
          key: 'Категории не найдены',
        },
      ],
    }
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    saveForm() {
      let tags = this.tags.slice(1).split(' #')
      this.changeDataStore.setProjectName(this.projectName)
      let newCategory = 0
      const currentCategory = document.getElementById("hover-btn").innerText
      this.categories.forEach(category => {
        if (currentCategory == category.name) {
          newCategory = category.id
        }
      })
      this.changeDataStore.setCategory(newCategory)
      this.changeDataStore.setTags(tags)
      this.changeDataStore.update()
    },
    cancelCallback() {
      this.changeDataStore.closeModal()
    },
    async fetchCategories(): [] {
      await LibraryModel.getCategories().then((response) => {
        if (response.success){
          this.options = []
          const data = response.data

          data.forEach(item => {
            this.options.push({
              label: item.name,
              key: item.name
            })
            this.categories.push({
              id: item.id,
              name: item.name
            })
          })
        }
      })
    }
  },
  computed: {
    visible() {
      return this.changeDataStore.showModal
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

#hover-btn {
  width: 15rem;
  margin: 1.5rem;
  color: #3535478C;
}
#hover-btn:hover {
  width: 15rem;
  margin: 1.5rem;
  color: #3535478C;
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