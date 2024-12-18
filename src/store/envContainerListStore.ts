import { defineStore } from 'pinia';
import DockerModel from '@/api/modules/docker/models/docker.model';
import { ContainerDto } from '@/api/modules/docker/dto/container.dto.ts';
import CommandResultDto from '@/api/modules/docker/dto/command-result.dto.ts';

export const useEnvContainerListStore = defineStore('envContainerListStore', {
  state: () => ({
    containers: [] as ContainerDto[],
  }),
  actions: {
    async loadContainers(id: number) {
      const dockerModel = new DockerModel();
      const response = await dockerModel.getContainers(id);
      this.containers = response.data;
    },
    async startContainer(
      envId: number,
      containerId: number,
    ): Promise<CommandResultDto> {
      const dockerModel = new DockerModel();
      const result = await dockerModel.startContainer(envId, containerId);
      return result;
    },

    async stopContainer(
      envId: number,
      containerId: number,
    ): Promise<CommandResultDto> {
      const dockerModel = new DockerModel();
      const result = await dockerModel.stopContainer(envId, containerId);
      return result;
    },
  },
  getters: {
    getAllContainers(state): ContainerDto[] {
      return state.containers;
    },
  },
});