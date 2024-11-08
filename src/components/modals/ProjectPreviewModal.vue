<template>
  <div v-if="checkStatus" class="backgroundContainer">
    <div class="container">
      <div class="closePart" @click="closeModal">
        <img src="@/assets/svg/close.svg" class="img"/>
      </div>
      <div class="inputsContainer">
        <img src="@/assets/svg/dami.svg" class="preview">
      </div>
      <div class="controlGroup">
        <div class="upPart">
          <div class="leftPart">
            <h2 class="titleProj">{{data.name}}</h2>
            <div class="info">
              <p class="cardDate text">{{formattedDate}}</p>
              <span class="separatorText">|</span>
              <span class="starsCount text">
                <img src="../assets/imageCard/star.svg" alt="star" class="starImg"/>
                {{data.stars}}
            </span>
            </div>
          </div>
          <n-button quaternary color="#FF356BA6" @click="deleteProject" class="btnText deleteBtn"> Удалить
            <DeleteFormComponent/>
            <template #icon>
              <n-icon>
                <Delete/>
              </n-icon>
            </template>
          </n-button>
        </div>
        <div class="downPart">
          <n-button color="#3535FFA6" class="btn" @click="goToEditor">Редактировать
            <template #icon>
              <n-icon>
                <Pencil/>
              </n-icon>
            </template>
          </n-button>
          <div class="btnGroup">
            <n-button color="#3535FFA6" class="btn" @click="share">Поделиться
              <template #icon>
                <n-icon>
                  <Share />
                </n-icon>
              </template>
            </n-button>
            <n-button color="#3535FFA6" class="btn" @click="download">Скачать
              <template #icon>
                <n-icon>
                  <Download />
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Download as Download, Pencil, Share, Trash as Delete } from '@vicons/ionicons5';
import usePreviewModalStore from '@/store/project-preview-modal.store.ts';
import useEditorStore from '@/store/editor.store.ts';
import Packager from '@/editor/core/Packager.ts';
import { getEditorInstance } from '@/editor/plugin.ts'
import DeleteFormComponent from '@/components/modals/DeleteFormComponent.vue';
import HelloFormComponent from '@/components/modals/HelloFormComponent.vue';
import useDeleteProjectModalStore from '@/store/modals/delete-form-component.store.ts';

export default {
  name: "ProjectPreviewModal",
  components: {
    HelloFormComponent,
    DeleteFormComponent,
    Download,
    Delete,
    Share,
    Pencil
  },
  setup() {
    return {
      previewModalStore: usePreviewModalStore(),
      editorStore: useEditorStore(),
      deleteModalStore: useDeleteProjectModalStore(),
    }
  },
  computed: {
    data(){
      return this.previewModalStore.getData
    },
    checkStatus(){
      return this.previewModalStore.getStatus
    },
    formattedDate() {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      console.log(this.data)
      return (new Date(this.data.created_at)).toLocaleDateString('ru-RU', options).replace(/\//g, '.');
    },
  },
  methods: {
    closeModal() {
      this.previewModalStore.closeModal()
    },
    download() {
      const app = getEditorInstance()
      app.initState = JSON.parse(this.data.data);
      const packager = new Packager(app)

      const blob = packager.blob()

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'index.html';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    goToEditor() {
      console.log(this.data)
      this.editorStore.use(this.data)
      this.$router.push({ path: `/project/${this.data.id}/edit` })
    },
    share() {

    },
    deleteProject() {
      const id = this.data.id
      const name = this.data.name
      this.deleteModalStore.openModal({ project: { id: id, name: name } })
    }
  }
}
</script>

<style scoped>
.backgroundContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(204, 200, 200, 0.85);
  Backdrop-filter: blur(40px);
  z-index: 9;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1.5rem;
  justify-content: center;
  row-gap: 2rem;
  align-items: center;
  width: 80vw;
  min-width: 500px;
  min-height: 500px;
  max-width: 80vw;
  max-height: 80vh;
  padding-bottom: 3.5rem;
  z-index: 10;
}

.inputsContainer {
  width: 90%;
}
.inputsContainer img {
  width: 100%;
}

.closePart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: end;
  justify-self: start;
  width: 50px;
  margin-left: 1rem;
  position: relative;
  bottom: 1rem;
  left: 1rem;
  min-height: 50px;
  max-height: 50px;
  height: 3.5rem;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
}

.preview {
  width: 70vw;
  height: auto;
}

.controlGroup {
  width: 90%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.upPart {
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.leftPart {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.titleProj {
  width: fit-content;
  max-width: 60%;
  font-size: 2rem;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.cardDate {
  width: fit-content;
}

.text {
  font-size: 1.3rem;
  color: #35354778;
}

.btnText {
  font-size: 1.2rem;
}

.starsCount {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: .2rem
}

.starImg {
  width: 1.3rem;
  height: 1.3rem;
}

.separatorText {
  font-size: 1.3rem;
  color: #35354778;
}

.downPart {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btnGroup {
  display: flex;
  flex-direction: row;
  gap: 1rem
}


</style>