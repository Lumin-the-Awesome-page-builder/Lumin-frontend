<template>
  <div class="card">
    <div class="card-content">
      <div class="image-container">
        <img alt="project" class="image-card-project" :src="imageSrc" />
        <div @click="openModal" class="overlay">
          <img class="overlay-eye" src="@/assets/imageCard/eye.svg" alt="Просмотреть">
        </div>
        <div class="checkbox-container">
          <n-checkbox @update:checked="() => {checked(id)}" />
        </div>
      </div>
      <div class="card-info">
        <h3 class="card-title">
          {{ title }}
          <img class="edit-title" @click="editTitle" src="@/assets/imageCard/pencil.svg" alt="edit" />
        </h3>
        <div class="card-stats">
          <div class="info">
            <p class="card-date">{{ formattedDate }}</p>
            <span class="separator">|</span>
            <span class="stars-count">
              <img src="../assets/imageCard/star.svg" alt="star" />
              {{ stars }}
            </span>
          </div>
          <div class="card-actions">
            <img @click="shareProject" class="action-button" src="@/assets/imageCard/share.svg" alt="share" />
            <img @click="downloadProject" class="action-button" src="@/assets/imageCard/download.svg" alt="download" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useDashboardStore from '@/store/dashboard.store.ts';
import usePreviewModalStore from '@/store/project-preview-modal.store.ts';

export default {
  name: "CardComponent",
  props: {
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: 'название проекта',
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
    stars: {
      type: Number,
      default: 0,
    },
    imageSrc: {
      type: String,
      default: '',
    },
    itemType: {
      type: String,
      default: 'project'
    }
  },
  setup() {
    return {
      previewModalStore: usePreviewModalStore(),
      dashboardStore: useDashboardStore()
    }
  },
  computed: {
    formattedDate() {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return this.date.toLocaleDateString('ru-RU', options).replace(/\//g, '.');
    },
  },
  methods: {
    editTitle() {
      console.log(this.title);
    },
    shareProject() {
      console.log(this.title);
    },
    downloadProject() {
      console.log(this.title);
    },
    checked(id) {
      this.dashboardStore.toggleSelected(id);
    },
    openModal() {
      this.previewModalStore.openModal(this.id, this.itemType)
    }
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.625rem;
  width: 18.75rem;
  padding: 1rem;
  border: 0.0625rem solid #ddd;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 0.5rem 0.75rem rgb(90 24 160 / 8%);
}

.image-container {
  position: relative;
  width: 100%;
}

.image-card-project {
  width: 100%;
  height: 11.375rem;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.image-container:hover .overlay {
  opacity: 1;
}

.checkbox-container {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox {
  display: none;
}

.checkbox-label {
  width: 0.8rem;
  height: 0.8rem;
  /*background: url('@/assets/imageCard/checkMark.svg') no-repeat center;*/
  background-size: contain;
  cursor: pointer;
}

.card-info {
  width: 100%;
  margin-top: 0;
}

.card-title {
  font-size: 1.125rem;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.edit-title {
  cursor: pointer;
  font-size: 0.875rem;
}

.card-stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.8rem;
}

.info {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
}

.separator {
  font-size: 0.8rem;
  margin-left: 0.6rem;
}

.stars-count {
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
}

.card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.8rem;
  justify-content: flex-end;
  gap: 1rem;
  background: none;
}

.action-button {
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  background: none;
}
</style>
