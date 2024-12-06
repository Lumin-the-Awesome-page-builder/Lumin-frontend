<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectCard",
  props: {
    bannerSrc: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.7,
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
    stars: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    formattedDate() {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return this.date.toLocaleDateString('ru-RU', options).replace(/\//g, '.');
    },
  },
  methods: {
    shareProject() {
      console.log("Share project");
    },
    downloadProject() {
      console.log("Download project");
    },
    deleteProject() {
      console.log("Delete project");
    },
    editProject() {
      console.log("Edit project");
    },
  },
});
</script>

<template>
  <div class="modal-overlay">
    <div class="project-card">
      <div class="banner">
        <img :src="bannerSrc" alt="Project Banner" class="banner-image" />
        <button class="preorder-button">оформить предзаказ</button>
      </div>
      <div class="project-info">
        <h2 class="project-title">Название проекта 1</h2>
        <div class="info">
          <p class="card-date">{{ formattedDate }}</p>
          <span class="separator">|</span>
          <span class="stars-count">
            <img src="../assets/imageCard/star.svg" alt="star" />
            {{ stars }}
          </span>
        </div>
        <div class="delete-section" @click="deleteProject">
          <img class="delete-icon" src="@/assets/imageCardProject/delete.svg" alt="delete" />
          <span class="delete-text">Удалить</span>
        </div>
      </div>
      <div class="action-buttons">
        <div class="edit-section">
          <img @click="editProject" class="action-button" src="@/assets/imageCardProject/edit_pencil.svg" alt="edit" />
          <span class="edit-text">Редактировать</span>
        </div>
        <div class="section2">
          <div class="share-icon">
            <img @click="shareProject" class="action-button" src="@/assets/imageCardProject/share_icon.svg" alt="share" />
            <span class="action-text">Поделиться</span>
          </div>
          <div class="download-icon">
            <img @click="downloadProject" class="action-button" src="@/assets/imageCardProject/download_icon.svg" alt="download" />
            <span class="action-text">Скачать</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.project-card {
  width: 80vw;
  height: 80vh;
  max-width: 50rem;
  max-height: 50rem;
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #e0e0e0;
  border-radius: 0.5rem;
  background-color: #ffffff;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

.banner {
  position: relative;
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 0.3rem;
  object-fit: contain;
}

.preorder-button {
  position: absolute;
  top: 6rem;
  right: 5rem;
  padding: 0.5rem 1rem;
  background-color: #2ecc71;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
}

.preorder-button:hover {
  background-color: #27ae60;
}

.project-info {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex: 1;
}

.project-title {
  font-weight: bold;
  margin: 0;
}

.info {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin-bottom: -0.5rem;
  color: #888;
  margin-left: -20rem;
}

.separator {
  font-size: 0.8rem;
  margin-left: 0.6rem;
}

.stars-count {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.stars-count img {
  margin-right: 0.2rem;
  margin-top: -0.1rem;
}

.delete-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.delete-icon {
  width: 0.75rem;
  height: 1rem;
}

.delete-text {
  color: #FF356B;
  font-size: 0.875rem;
  font-weight: 300;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.action-button {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.edit-section {
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.2rem;
  cursor: pointer;
  background-color: rgba(53, 53, 255, 0.65);
}

.edit-text {
  color: white;
  margin-left: 0.5rem;
}

.section2 {
  display: flex;
  align-items: center;
}

.share-icon,
.download-icon {
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.2rem;
  cursor: pointer;
  background-color: rgba(53, 53, 255, 0.65);
  margin-left: 0.5rem;
}

.action-text {
  color: white;
  margin-left: 0.5rem;
}
</style>
