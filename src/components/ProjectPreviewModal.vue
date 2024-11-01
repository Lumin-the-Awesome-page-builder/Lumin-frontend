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
          <n-button quaternary color="#FF356BA6" class="btnText"> Удалить
            <template #icon>
              <n-icon>
                <Delete/>
              </n-icon>
            </template>
          </n-button>
        </div>
        <div class="downPart">
          <n-button color="#3535FFA6" class="btn">Редактировать
            <template #icon>
              <n-icon>
                <Pencil/>
              </n-icon>
            </template>
          </n-button>
          <div class="btnGroup">
            <n-button color="#3535FFA6" class="btn">Поделиться
              <template #icon>
                <n-icon>
                  <Share />
                </n-icon>
              </template>
            </n-button>
            <n-button color="#3535FFA6" class="btn">Скачать
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

const store = usePreviewModalStore()

export default {
  name: "ProjectPreviewModal",
  components: {
    Download,
    Delete,
    Share,
    Pencil
  },
  computed: {
    data(){
      return store.getData
    },
    checkStatus(){
      return store.getStatus
    },
    formattedDate() {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      console.log(this.data)
      return (new Date(this.data.created_at)).toLocaleDateString('ru-RU', options).replace(/\//g, '.');
    },
  },
  methods: {
    closeModal() {
      store.closeModal()
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
  align-items: center;
  width: 90vw;
  min-width: 500px;
  min-height: 500px;
  height: 90vh;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  z-index: 10;
}

.closePart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 6%;
  left: 50%;
  width: 50px;
  min-height: 50px;
  max-height: 50px;
  height: 100%;
  border-radius: 50%;
  background-color: white;
}

.img {
  cursor: pointer;
}

.preview {
  width: 80vw;
  height: 70vh;
}

.controlGroup {
  width: 80vw;
}

.downPart {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.btnGroup {
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

}

.upPart {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.leftPart {
  width: 35%;
  min-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 300px;
}

.text {
  font-size: 1.3rem;
  color: #35354778;

}

.starImg {
  width: 1.3rem;
  height: 1.3rem;
}

.starsCount {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.titleProj {
  font-size: 2rem;
}

.separatorText {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  font-size: 1.3rem;
  color: #35354778;
}

.btnText {
  font-size: 1.2rem;
}

.btn {
  font-size: 1.1rem;
}
</style>