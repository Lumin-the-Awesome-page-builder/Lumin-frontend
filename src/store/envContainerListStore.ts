import { defineStore } from 'pinia';
import DockerModel from '@/api/modules/docker/models/docker.model';
import { ContainerDto } from '@/api/modules/docker/dto/container.dto.ts';
import CommandResultDto from '@/api/modules/docker/dto/command-result.dto.ts';
import ApiResponseDto from '../api/dto/api-response.dto';

export const useEnvContainerListStore = defineStore('envContainerListStore', {
  state: () => ({
    containers: [] as ContainerDto[],
  }),
  actions: {
    async loadContainers(id: number) {
      const dockerModel = new DockerModel();
      let response = await dockerModel.getContainers(id);
      this.containers = response.getData();
      if (this.containers.length == 0) {
        await dockerModel.startEnv(id);
        response = await dockerModel.getContainers(id);
      }
      if (response.getData()[0]) {
        this.containers = response.getData();
      } else {
        this.containers = [response.getData()];
      }
    },
    async startContainer(
      envId: number,
      containerId: number,
    ): Promise<ApiResponseDto<CommandResultDto>> {
      const dockerModel = new DockerModel();
      const res = await dockerModel.startContainer(envId, containerId);
      this.containers = this.containers.map((el) => {
        if (el.id == containerId) {
          return {
            ...res.getData(),
          };
        } else {
          return el;
        }
      });
      return res;
    },

    async stopContainer(
      envId: number,
      containerId: number,
    ): Promise<ApiResponseDto<CommandResultDto>> {
      const dockerModel = new DockerModel();
      const res = await dockerModel.stopContainer(envId, containerId);
      this.containers = this.containers.map((el) => {
        if (el.id == containerId) {
          return {
            ...res.getData(),
          };
        } else {
          return el;
        }
      });
      return res;
    },
  },
  getters: {
    getAllContainers(state): ContainerDto[] {
      return state.containers;
    },
  },
});
