<template>
  <div class="pure-edit-modal-wrapper" v-if="showModal">
    <div class="pure-edit-modal-content">
      <div class="btn-container">
        <div class="custom-file-upload">
          <label for="file-upload" class="custom-label">Прикрепить фото</label>
          <input type="file" id="file-upload" @change="uploaded" />
          <n-button color="#7b7bfe" @click="closeModal">Закрыть</n-button>
        </div>
      </div>
      <div class="image-grid">
        <div v-for="img in images" :key="img.name" class="image-item">
          <img
              :src="getSrc(img.name)"
              @click="changeByName(img.name)"
              :class="{ selected: value === img.name }"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="wrapContainer">
    <n-button color="#7b7bfe" @click="openEditModal">Выбрать изображение</n-button>
  </div>
</template>


<script lang="ts">
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import MediaModel from '@/api/modules/media/models/media.model';
import ImageSrcProp from '@/editor/properties/ImageSrcProp';

export default {
  name: 'InputName',
  components: { OptionHeadingComponent },
  emits: ['changed'],
  props: {
    prop: {
      type: ImageSrcProp
    }
  },
  data: () => ({
    value: "",
    images: [],
    showModal: false,
  }),
  mounted() {
    this.value = this.prop.value[0];
    this.load()
  },
  methods: {
    async load() {
      this.images = (await MediaModel.getMedia()).getData()
    },
    getSrc(src) {
      return "https://api.lumin.dudosyka.ru/lumin/file/" + src
    },
    async getBase64(src) {
      const response = await fetch(this.getSrc(src));
      const imageBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      return await (new Promise(resolve => {
        reader.onload = function() {
          resolve(reader.result)
        };
      }))
    },
    openEditModal() {
      this.showModal = true
    },
    async uploaded(ev) {
      const reader = new FileReader()
      reader.readAsDataURL(ev.target.files[0]); // Read the file as a Data URL

      const base64: string = await (new Promise(resolve => {
        reader.onload = function() {
          console.log(reader.result)
          const base64String = reader.result
          resolve(base64String)
        };
      }))
      console.log(base64)
      await MediaModel.uploadMedia(ev.target.value.split("\\")[ev.target.value.split("\\").length - 1], base64.split(',')[1])
      await this.load()
      this.change(base64)
      ev.target.value = null
    },
    async changeByName(imgName: string) {
      console.log('!!!! before !!!!')
      console.log('value: ', this.value, 'img.name: ', imgName)
      this.value = imgName;
      console.log('!!!! after !!!!')
      console.log('value: ', this.value, 'img.name: ', imgName)
      const base64 = await this.getBase64(imgName)
      console.log("change to", base64)
      this.change(base64)
    },
    change(img) {
      this.showModal = false
      this.prop.setValue([img])
      this.$emit('changed')
    },
    closeModal() {
      this.showModal = false;
    }
  },
};
</script>

<style scoped>
.wrapContainer {
  background-color: #ffffff;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.pure-edit-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pure-edit-modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-height: 80%;
  margin: auto;
}

.cm-component > * {
  font-family: "Source Code Pro", monospace;
  font-optical-sizing: auto;
  font-size: 20px;
  font-style: normal;
}

.btn-container {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.custom-file-upload {
  display: flex;
  flex-direction: row;
  justify-content: start;
  column-gap: 2rem;
}

.custom-file-upload input {
  display: none;
}

.custom-label {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #7b7bfe;
  color: white;
  border-radius: 5px;
}

.custom-label:hover {
  background-color: #5a5adf;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 1rem;
  overflow-y: auto;
  max-height: calc(100vh - (200px));
  width: calc(100% - (2rem));
}

.image-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-item img {
  max-width: 100%;
  max-height: 150px;
  object-fit: cover;
  transition: border 0.3s ease, box-shadow 0.3s ease; /* Плавный переход для границы и тени */
}

.selected {
  border: 3px solid #5a5adf; /* Тонкая синяя граница */
  box-shadow: 0 0 10px #7b7bfe; /* Синяя тень вокруг изображения */
}
</style>