  <template>
    <div class="pure-edit-modal-wrapper" v-if="showModal">
      <div class="pure-edit-modal-content">
        <div class="btn-container">
          <div class="custom-file-upload">
            <label for="file-upload" class="custom-label">Прикрепить фото</label>
            <input type="file" id="file-upload" @change="uploaded_temporary" />
            <n-button color="#7b7bfe" @click="closeModal">Закрыть</n-button>
          </div>
        </div>
        <div v-for="img in images" :key="img.name">
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
      async uploaded_temporary(ev) {
        const file = ev.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            const base64String = reader.result.split(',')[1];
            await MediaModel.uploadMedia(file.name, base64String);
            await this.load();
            this.change(base64String);
          };
        }
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
        await MediaModel.uploadMedia(ev.target.value.split("\\").pop(), base64) // Используем .pop() для получения имени файла
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

    .custom-file-upload {
      display: flex;
      flex-direction: row;
      justify-content: start;
      column-gap: 2rem;
      width: 100%;
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
      transition: background-color 0.3s ease;
    }

    .custom-label:hover {
      background-color: #5a5adf;
    }
  </style>