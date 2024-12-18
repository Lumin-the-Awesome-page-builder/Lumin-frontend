import ApiRequestDto from '@/api/dto/api-request.dto';
import ApiResponseDto from '@/api/dto/api-response.dto';
import ApiModelUtil from '@/utils/api-model.util';
import CommandResultDto from '@/api/modules/docker/dto/command-result.dto';
import EnvironmentDto from '@/api/modules/docker/dto/environment.dto';
import CreateFromConfigurationDto from '@/api/modules/docker/dto/create-from-configuration.dto';
import ConfigurationDto from '../dto/configuration.dto';
import CreateConfigurationDto from '@/api/modules/docker/dto/create-configuration.dto.ts';
import UploadConfigurationsFilesDto from '@/api/modules/docker/dto/upload-configurations-files.dto.ts';

export default class DockerModel extends ApiModelUtil {
  constructor() {
    super('');
  }

  public async create(name: string) {
    return await this.authorizedRequest<ApiResponseDto<EnvironmentDto>>(
      new ApiRequestDto('/lumin/docker/environment', 'POST', {
        name,
      }),
    );
  }

  public async getEnvs() {
    return await this.authorizedRequest<ApiResponseDto<EnvironmentDto[]>>(
      new ApiRequestDto('/lumin/docker/environment', 'GET'),
    );
  }

  public async getContainers(envId: number) {
    return await this.authorizedRequest<ApiResponseDto<EnvironmentDto>>(
      new ApiRequestDto(`/lumin/docker/${envId}/containers`, 'GET'),
    );
  }

  public async stopEnv(envId: number) {
    return await this.authorizedRequest<ApiResponseDto<CommandResultDto>>(
      new ApiRequestDto(`/lumin/docker/${envId}/stop/all`, 'GET'),
    );
  }

  public async startEnv(envId: number) {
    return await this.authorizedRequest<ApiResponseDto<CommandResultDto>>(
      new ApiRequestDto(`/lumin/docker/${envId}/start/all`, 'POST'),
    );
  }

  public async downEnv(envId: number) {
    return await this.authorizedRequest<ApiResponseDto<CommandResultDto>>(
      new ApiRequestDto(`/lumin/docker/${envId}/down/all`, 'GET'),
    );
  }

  public async startContainer(envId: number, containerId: number) {
    return await this.authorizedRequest<CommandResultDto>(
      new ApiRequestDto(
        `/lumin/docker/${envId}/container/${containerId}/start`,
        'POST',
      ),
    );
  }

  public async stopContainer(envId: number, containerId: number) {
    return await this.authorizedRequest<CommandResultDto>(
      new ApiRequestDto(
        `/lumin/docker/${envId}/container/${containerId}/stop`,
        'POST',
      ),
    );
  }

  public async getLogs(envId: number, containerId: number, size: number = 300) {
    return await this.authorizedRequest<ApiResponseDto<CommandResultDto>>(
      new ApiRequestDto(
        `/lumin/docker/${envId}/container/${containerId}/logs`,
        'POST',
        {
          size,
        },
      ),
    );
  }

  public async update(envId: number, data: string) {
    return await this.authorizedRequest<ApiResponseDto<any>>(
      new ApiRequestDto(`/lumin/docker/${envId}/compose`, 'POST', { data }),
    );
  }

  public async getCompose(envId: number) {
    return await this.authorizedRequest<ApiResponseDto<any>>(
      new ApiRequestDto(`/lumin/docker/${envId}/compose`, 'GET'),
    );
  }

  public async getConfigurations() {
    return await this.authorizedRequest<ApiResponseDto<ConfigurationDto>>(
        new ApiRequestDto(`/lumin/docker/configurations`, 'GET')
    )
  }

  public async createFromConfiguration(createDto: CreateFromConfigurationDto) {
    return await this.authorizedRequest<ApiResponseDto<EnvironmentDto>>(
        new ApiRequestDto(`/lumin/docker/configuration`, "POST", {
            ...createDto
        })
    )
  }

  public async createEnvironment(
    configurationId: number,
    createDto: CreateConfigurationDto,
  ) {
    const url = `/lumin/docker/configurations/${configurationId}/environment`;

    return await this.authorizedRequest<ApiResponseDto<EnvironmentDto>>(
      new ApiRequestDto(url, 'POST', {
        ...createDto,
      }),
    );
  }

  public async uploadFiles(
    environmentId: number,
    uploadDto: UploadConfigurationsFilesDto,
  ) {
    const url = `/lumin/docker/${environmentId}/upload`;

    return await this.authorizedRequest<ApiResponseDto<EnvironmentDto>>(
      new ApiRequestDto(url, 'POST', {
        ...uploadDto,
      }),
    );
  }
}
