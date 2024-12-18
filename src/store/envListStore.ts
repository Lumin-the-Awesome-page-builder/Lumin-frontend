import { defineStore } from 'pinia';
import DockerModel from '@/api/modules/docker/models/docker.model';
import { EnvironmentDto } from '@/api/modules/docker/dto/environment.dto.ts';

export const useEnvListStore = defineStore('envListStore', {
  state: () => ({
    environments: [] as EnvironmentDto[],
  }),

  actions: {
    async load() {
      const dockerModel = new DockerModel();
      const response = await dockerModel.getEnvs();
      this.environments = response.data;
    },
  },

  getters: {
    getAllEnvironments(state): EnvironmentDto[] {
      return state.environments;
    },
  },
});
