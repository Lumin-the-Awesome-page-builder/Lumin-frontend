<script lang="ts">
export default {
  name: "CardComponent",
  props: {
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
  },
};
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="image-container">
        <img alt="project" class="image-card-project" :src="imageSrc"/>
        <div class="checkbox-container">
          <input type="checkbox" class="checkbox" id="check" />
          <label for="check" class="checkbox-label"></label>
        </div>
      </div>
      <div class="card-info">
        <h3 class="card-title">
          {{ title }}
          <img class="edit-title" @click="editTitle" src="../assets/imageCard/pencil.svg" alt="edit"/>
        </h3>
        <div class="card-stats">
          <div class="info">
            <p class="card-date">{{ formattedDate }}</p>
            <span class="separator">|</span>
            <span class="stars-count">
              <img src="../assets/imageCard/star.svg" alt="star">
              {{ stars }}</span>
          </div>
          <div class="card-actions">
            <img @click="shareProject" class="action-button" src="../assets/imageCard/share.svg" alt="share"/>
            <img @click="downloadProject" class="action-button" src="../assets/imageCard/download.svg" alt="download"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.625rem;
  width: 18.75rem;
  padding: 1rem;
  border: 0.0625rem solid #ddd;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.2);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  position: relative;
}

.image-card-project {
  width: 18.5rem;
  height: 11.375rem;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 0;
  cursor: pointer;
  opacity: 1;
}

.image-card-project:hover {
  opacity: 0.25;
}

.checkbox-container {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: white;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.checkbox {
  display: none;
}

.checkbox-label {
  width: 0.8rem;
  height: 0.8rem;
  background: url('../assets/imageCard/checkMark.svg') no-repeat center;
  /*надо чтобы она переключалась.*/
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
  align-items: center;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.info {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: #888;
}

.separator {
  font-size: 0.8rem;
  margin-left: 0.60rem;
}

.stars-count {
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
}

.card-actions {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  justify-content: flex-end;
  gap: 1rem;
  background: none;
}

.action-button {
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.125rem;
  background: none;
}

</style>
