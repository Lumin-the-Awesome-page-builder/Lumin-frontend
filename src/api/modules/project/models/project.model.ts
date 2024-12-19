import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import ApiRequestDto from '@/api/dto/api-request.dto.ts';
import CreateProjectDto from '@/api/modules/project/dto/create-project.dto.ts';
import ProjectDto from '@/api/modules/project/dto/project.dto.ts';
import UpdateProjectDto from '@/api/modules/project/dto/update-project.dto.ts';
import ApiModelUtil from '@/utils/api-model.util.ts';
import PatchProjectTreeDto from '@/api/modules/project/dto/patch-project-tree.dto.ts';
import PatchProjectShareSettingsDto from '@/api/modules/project/dto/patch-project-share-settings.dto.ts';
import CollaborationTokenDto from '@/api/modules/project/dto/collaboration-token.dto.ts';
import StartEditDto from '../dto/start-edit.dto';
import LoggerUtil from '@/utils/logger/logger.util';

export class ProjectModel extends ApiModelUtil {
  constructor() {
    super('');
  }

  public async create(
    data: CreateProjectDto,
  ): Promise<ApiResponseDto<ProjectDto>> {
    return await this.authorizedRequest(
      new ApiRequestDto('/lumin/project', 'POST', data),
    );
  }

  public async update(
    id: number,
    data: UpdateProjectDto,
  ): Promise<ApiResponseDto<ProjectDto>> {
    return await this.authorizedRequest(
      new ApiRequestDto(`/lumin/project/${id}`, 'PATCH', data),
    );
  }

  public async delete(id: number): Promise<ApiResponseDto<{ status: any }>> {
    return await this.authorizedRequest(
      new ApiRequestDto(`/lumin/project/${id}`, 'DELETE'),
    );
  }

  public async getOne(id: number): Promise<ApiResponseDto<ProjectDto>> {
    return await this.authorizedRequest(
      new ApiRequestDto(`/lumin/project/${id}`, 'GET'),
    );
  }

  public async startEditing(
    idOrAccess: any,
  ): Promise<ApiResponseDto<StartEditDto>> {
    return await this.authorizedRequest(
      new ApiRequestDto(`/lumin/project/${idOrAccess}/start-edit`, 'GET'),
    );
  }

  public async patchTree(id: number, patchProjectTreeDto: PatchProjectTreeDto) {
    LoggerUtil.debug(
      'DANGER! HTTP PATCH TREE METHOD WAS CALLED!!!',
      id,
      patchProjectTreeDto,
    );
    return null;
  }

  public async patchPreview(
    id: number,
    encodedPreview: string,
  ): Promise<ApiResponseDto<any>> {
    return await this.authorizedRequest(
      new ApiRequestDto(`/lumin/project/${id}/preview`, 'PATCH', {
        preview: encodedPreview,
      }),
    );
  }

  public async patchShare(
    id: number,
    patchProjectShareSettingsDto: PatchProjectShareSettingsDto,
  ) {
    return await this.authorizedRequest<{ status: boolean }>(
      new ApiRequestDto(
        `/lumin/project/${id}/share`,
        'PATCH',
        patchProjectShareSettingsDto,
      ),
    );
  }

  public async getCollaborationToken(id: number) {
    return await this.authorizedRequest<CollaborationTokenDto>(
      new ApiRequestDto(`/lumin/project/${id}/collaboration`, 'GET'),
    );
  }

  public async setDomain(projectId: number, domainName: string) {
    return await this.authorizedRequest<any>(
      new ApiRequestDto(`/lumin/nginx/${projectId}`, 'POST', {
        name: domainName,
      }),
    );
  }
}

export default new ProjectModel();
