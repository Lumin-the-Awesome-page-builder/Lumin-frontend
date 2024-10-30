import { defineStore } from 'pinia'

const usePreviewModalStore = defineStore({
  id: 'previewModal',
  state: () => ({
    data: {
      id: 1,
      name: "Test project",
      date: Date.now(),
      stars: 14
    },
    isOpen: false
  }),
  getters: {
    getStatus: state => state.isOpen,
    getData: state => state.data
  },
  actions: {
    closeModal(){
      this.isOpen = false
      this.data = {}
    },
    openModal(inputData: { id: number, name: string, date: number, stars: number }) {
      this.isOpen = true
      this.data = inputData
    }
  }
})
export default usePreviewModalStore;