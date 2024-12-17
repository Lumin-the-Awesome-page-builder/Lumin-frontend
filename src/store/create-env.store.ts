import { defineStore } from "pinia"

const useCreateEnvStore = defineStore({
    id: "CreateEnvStore",
    state: () => ({
        name: "",
        selectedConf: 0,
        compose: ""
    }),
    actions: {
        createFromConf() {

        },
        createPure() {

        }
    }
})

export default useCreateEnvStore