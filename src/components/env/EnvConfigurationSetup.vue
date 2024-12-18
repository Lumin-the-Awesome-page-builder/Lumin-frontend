<template>
    <div class="file-item" v-for="file in files">
      <p>Загруженные файлы:</p>
      <div class="description-row">
        <span class="description">Название</span>
        <span class="description">Описание</span>
      </div>
        <div class="description-row">
            <span class="title">{{ file.title }}</span>
            <span class="title">{{ file.description }}</span>
        </div>

        <div class="upload">
            <input type="file" id="file-upload" @change="onFileChange($event, file.name)" />
        </div>
    </div>
</template>

<script lang="ts">
import useCreateEnvStore from '@/store/create-env.store';

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
    });
};

export default {
    name: "EnvConfigurationSetup",
    setup() {
        return {
            createEnvStore: useCreateEnvStore()
        }
    },
    computed: {
        selected() {
            return this.createEnvStore.selected
        },
        files() {
            return Object.keys(this.selected.mapping).map(el => ({
                ...this.selected.mapping[el],
                name: el
            }))
        }
    },
    methods: {
        onFileChange(event: Event, fileName: string) {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                const extension = file.name.split('.').pop() || '';

                convertToBase64(file).then(base64 => {
                    this.createEnvStore.uploaded[fileName] = { extension, base64: base64.split('base64,')[1] };
                });
            }
        }
    }
}
</script>

<style>
.description-row {
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;

}
.title {
  color: black;
}

.description {
  color: #6F6C99;
}
</style>