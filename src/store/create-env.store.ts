import DockerModel from "@/api/modules/docker/models/docker.model"
import CreateEnvFromConfiguration from "@/api/modules/docker/dto/create-from-configuration.dto";
import { defineStore } from "pinia"

const useCreateEnvStore = defineStore({
    id: "CreateEnvStore",
    state: () => ({
        name: "",
        selectedConf: 0,
        configurations: [],
        uploaded: {},
        compose: ""
    }),
    getters: {
        selected: (state) => {
            if (state.selectedConf == 0)
                return null;
            const selected = state.configurations.filter(el => el.id == state.selectedConf)[0];
            const mapping = JSON.parse(selected.mapping)
            return {
                ...selected,
                mapping
            }
        },
        canSave(state) {
            return (this.selected && Object.keys(state.uploaded).length == Object.keys(this.selected.mapping).length)
        }
    },
    actions: {
        async loadConfigurations() {
            const dockerModel = new DockerModel()

            const confs = await dockerModel.getConfigurations();
            if (confs.success) {
                this.configurations = confs.getData()
            } 

            return confs;
        },
        async createFromConf() {
            if (!this.canSave) {
                alert('Гуляй, дядя')
            }

            const dockerModel = new DockerModel()
            const created = await dockerModel.createFromConfiguration(new CreateEnvFromConfiguration(this.selectedConf, this.name, this.uploaded))

            return created;
        },
        createPure() {
            console.log("Не сегодня, друг")
        }
    }
})

export default useCreateEnvStore