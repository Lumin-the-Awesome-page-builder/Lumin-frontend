import { defineStore } from 'pinia';
import DockerModel from '@/api/modules/docker/models/docker.model.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import CommandResultDto from '@/api/modules/docker/dto/command-result.dto.ts';

interface ContainerData {
  id: number;
  name: string;
  status: string;
}

interface LogData {
  logs: string;
}

export const useSelectedContainerStore = defineStore('selectedContainer', {
  state: () => ({
    containerData: null as ContainerData | null,
    logs: null as LogData | null,
  }),
  actions: {
    setContainerData(data: ContainerData) {
      this.containerData = data;
    },
    setContainerStatus(status: string) {
      if (this.containerData) {
        this.containerData.status = status; // Обновляем статус контейнера
      }
    },

    async fetchLogs(envId: number, containerId: number, size: string = '300') {
      const dockerModel = new DockerModel();
      const response = await dockerModel.getLogs(envId, containerId, size);
      const stdout = response.data.stdout;
      const stderr = response.data.err;

      this.logs = {
        logs:
          (stdout ? stdout : '') +
          (stdout && stderr ? '\n' : '') +
          (stderr ? stderr : ''),
      };
    },
    async stopContainer(
      envId: number,
      containerId: number,
    ): Promise<ApiResponseDto<CommandResultDto>> {
      const dockerModel = new DockerModel();
      const res = await dockerModel.stopContainer(envId, containerId);
      this.setContainerStatus(res.getData().status);
      return res;
    },
    async startContainer(
      envId: number,
      containerId: number,
    ): Promise<ApiResponseDto<CommandResultDto>> {
      const dockerModel = new DockerModel();
      const res = await dockerModel.startContainer(envId, containerId);
      this.setContainerStatus(res.getData().status);
      return res;
    },
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
      return response.getData();
    },
  },

  getters: {
    getContainerData(state): ContainerData {
      return state.containerData;
    },

    getLogs(state): LogData | null {
      return state.logs;
    },
  },
});
