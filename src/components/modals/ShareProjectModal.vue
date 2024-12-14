<template>
  <n-message-provider>
    <n-modal
      v-model:show="changeDataStore.showModal"
      transform-origin="center"
      style="width: 600px"
      preset="card"
      @negative-click="closeModal"
    >
      <n-card
        :bordered="false"
        size="medium"
        role="dialog"
        aria-modal="true"
      >
        <div class="container">
          <div class="inputs_container">
            <h2 class="container_title title">Параметры публикации</h2>
            <span class="user_title title">Сейчас доступ {{ linkText }}, а так же проект {{ marketplaceText }}</span>
            <input style="cursor:pointer;" readonly v-model="collaborationLink" @click="copyLink">
            <n-button color="#3535FFA6" class="btn" @click="changeMarketplaceSetting">{{ btnText }}</n-button>
            <n-checkbox
              @update:checked="changeShareSetting"
              :checked="collaboration"
              label="Разрешить совместное редактирование по ссылке"
            />
            <n-button color="#3535FFA6" class="btn" @click="closeModal">Сохранить</n-button>
          </div>
        </div>
      </n-card>
    </n-modal>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useChangeProjectSharingSettingsStore from '@/store/modals/change-project-share-settings-component.store.ts';
import { NCheckbox } from 'naive-ui'

export default defineComponent({
  name: "changeDataComponent",
  components: { "n-checkbox": NCheckbox },
  data() {
    return {
      collaboration: false,
      marketplace: false
    }
  },
  setup() {
    const changeDataStore = useChangeProjectSharingSettingsStore()
    
    return {
      changeDataStore
    }
  },
  created() {
    this.changeDataStore.$onAction(({ name, after }) => {
      after(() => {
        this.collaboration = this.changeDataStore.getCollaborationData;
        this.marketplace = this.changeDataStore.getMarketplaceData;
      });
    })
  },
  methods: {
    changeMarketplaceSetting() {
      this.marketplace = !this.marketplace
      this.changeDataStore.update({
        collaboration: this.collaboration,
        marketplace: this.marketplace
      })
    },
    changeShareSetting() {
      this.collaboration = this.collaboration != 1
      this.changeDataStore.update({
        collaboration: this.collaboration,
        marketplace: this.marketplace
      })
    },
    copyLink() {
      if (!this.collaborationLink || this.collaborationLink === '') return;
      navigator.clipboard.writeText(this.collaborationLink)
        .then(() => {
          alert('Link copied!')
        })
    },
    closeModal() {
      this.changeDataStore.closeModal()
    }
  },
  computed: {
    btnText() {
      return this.marketplace ?
        "скрыть из общего доступа" : "включить общий доступ"
    },
    linkText() {
      return this.collaboration ?
        "имеют все по ссылке" : "есть только у вас"
    },
    marketplaceText() {
      return this.marketplace ?
        "видно в маркетплейсе" : "не доступен на маркетплейсе"
    },
    collaborationLink() {
      return this.changeDataStore.collaborationLink;
    },
    visible() {
      return this.changeDataStore.showModal
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inputs_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: black;
  cursor: default;
}

.user_title{
  color: #6F6C99;
}

.input {
  width: 15rem;
}


.btn {
  width: 15rem;
  margin: 1.5rem;
}

#hover-btn {
  width: 15rem;
  margin: 1.5rem;
  color: #3535478C;
}
#hover-btn:hover {
  width: 15rem;
  margin: 1.5rem;
  color: #3535478C;
}

.inputBlock {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
}

.inputBlockText {
  color: #3535478C;
}

</style>