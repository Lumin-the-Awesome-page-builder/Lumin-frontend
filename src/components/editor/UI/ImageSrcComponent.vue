<template>
  <div
    class="pure-edit-modal-wrapper"
    v-if="showModal"
  >
    <div class="pure-edit-modal-content">
      <div class="btn-container">
        <span>Upload</span>
        <input type="file" color="#7b7bfe" @change="uploaded">
      </div>
      <div v-for="img in images">
        <img v-if="value != img.name" :src="getSrc(img.name)" @click="changeByName(img.name)" />
        <img v-else class="selected" :src="getSrc(img.name)" />
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
          const base64String = reader.result.split(',')[1]
          resolve(base64String)
        };
      }))
      console.log(base64)
      await MediaModel.uploadMedia(ev.target.value.split("\\")[ev.target.value.split("\\").length - 1], base64)
      await this.load()
      this.change(base64)
      ev.target.value = null
    },
    async changeByName(imgName: string) {
      const base64 = await this.getBase64(imgName)
      console.log("change to", base64)
      this.change(base64)
    },
    change(img) {
      this.showModal = false
      this.prop.setValue([img])
      this.$emit('changed')
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
    align-content: center;
  }

  .pure-edit-modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 2rem;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  .selected {
    border: red solid 1px;
  }
</style>