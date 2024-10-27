<template>
    <HeaderComponent />
    <div class="dashboard">
        <div class="content-wrapper">
            <div class="page-header">
                <h2 class="page-heading">Ваши проекты</h2>
              <span class="prj-count">{{ projectCount }} {{ projectLabel }}</span>
            </div>

            <n-input class="search-input" placeholder="Введите фразу для поиска...">
                <template #prefix>
                    <n-icon :component="Search" color="#6F6C99" />
                </template>
            </n-input>

            <CardGrid :data="data" type="default" />
        </div>
        <div class="footer">
      <n-p class="footerText">LuminTech 2024</n-p>
    </div>
    </div>
</template>

<script lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import { Search } from '@vicons/ionicons5';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
    name: 'DashboardView',
    components: { CardComponent },

    data() {
        return {
            Search,
            data: [
                { id: 1, name: "project 1", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 2, name: "project 2", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 3, name: "project 3", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 4, name: "project 4", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 5, name: "project 5", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 6, name: "project 6", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 7, name: "project 7", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 8, name: "project 8", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 6, name: "project 6", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 7, name: "project 7", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 8, name: "project 8", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 6, name: "project 6", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 7, name: "project 7", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 8, name: "project 8", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 6, name: "project 6", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 7, name: "project 7", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
                { id: 8, name: "project 8", date: "01/01/2001", imageSrc: "../src/assets/imageCard/screenshot.png", stars: 1488, data: [] },
            ],
        };
    },
    computed: {
      projectCount() {
        return this.data.length;
      },
      projectLabel() {
        const count = this.projectCount;
        if (count % 10 === 1 && count % 100 !== 11) {
          return 'проект';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
          return 'проекта';
        } else {
          return 'проектов';
        }
      }
  }
};
</script>

<style scoped>
body {
    width: 100vw;
    height: 100%;
    flex-direction: column;
    align-items: stretch;
    margin: 0;
    padding: 0;
}

.content-wrapper {
    width: 100%;
    gap: 1rem;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
}

.dashboard {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #f4f4f4;
    width: 100vw;
    height: 100vh;
    justify-content: space-between
}

.page-header {
    display: flex;
    flex-direction: row;
    color: black;
    align-items: center;
    gap: 2rem;
    margin: 1rem;
}

.search-input {
    border-radius: 10px;
}

.page-heading {
    margin: 0;
}

.prj-count {
    color: rgba(53, 53, 71, 0.49);
    font-size: 12px;
    font-weight: 400;
    padding-top: 5px;
}
.footer {
  width: 100%;
  height: 6vh;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.footerText {
  margin-left: 1.5rem;
}
</style>