import DockerModel from '@/api/modules/docker/models/docker.model';
import { defineStore } from 'pinia';
import CreateConfigurationDto from '@/api/modules/docker/dto/create-configuration.dto.ts';
import UploadConfigurationsFilesDto from '@/api/modules/docker/dto/upload-configurations-files.dto.ts';
import CreateFromConfigurationDto from '@/api/modules/docker/dto/create-from-configuration.dto';

const useCreateEnvStore = defineStore({
  id: 'CreateEnvStore',
  state: () => ({
    name: '',
    selectedConf: 0,
    configurations: [],
    uploaded: {},
    compose: '',
  }),
  getters: {
    selected: (state) => {
      if (state.selectedConf == 0) return null;
      const selected = state.configurations.filter(
        (el) => el.id == state.selectedConf,
      )[0];
      const mapping = JSON.parse(selected.mapping);
      return {
        ...selected,
        mapping,
      };
    },
    canSave(state) {
      return (
        this.selected &&
        Object.keys(state.uploaded).length ==
          Object.keys(this.selected.mapping).length
      );
    },
  },
  actions: {
    async loadConfigurations() {
      const dockerModel = new DockerModel();

      const confs = await dockerModel.getConfigurations();
      if (confs.success) {
        this.configurations = confs.getData();
      }

      return confs;
    },

    async createConfiguration() {
      const dockerModel = new DockerModel();
      const createConfigDto = new CreateConfigurationDto(this.name);

      const response = await dockerModel.createEnvironment(
        this.selectedConf,
        createConfigDto,
      );
      const created = await dockerModel.uploadFiles(
        response.getData().id,
        new UploadConfigurationsFilesDto(
          this.selectedConf,
          Object.keys(this.uploaded).map((el) => ({
            name: el,
            ...this.uploaded[el],
            file: this.uploaded[el].base64,
          })),
        ),
      );

      return [response, created];
    },

    async createFromConf() {
      if (!this.canSave) {
        alert('Гуляй, дядя');
      }

      const dockerModel = new DockerModel();
      const created = await dockerModel.uploadFiles(
        new CreateFromConfigurationDto(this.selectedConf, this.uploaded),
      );

      return created;
    },
    createPure() {
      console.log('Не сегодня, друг');
    },
  },
});

export default useCreateEnvStore;
