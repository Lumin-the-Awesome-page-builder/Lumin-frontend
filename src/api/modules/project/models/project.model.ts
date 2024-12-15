import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import ApiRequestDto from '@/api/dto/api-request.dto.ts';
import CreateProjectDto from '@/api/modules/project/dto/create-project.dto.ts';
import ProjectDto from '@/api/modules/project/dto/project.dto.ts';
import UpdateProjectDto from '@/api/modules/project/dto/update-project.dto.ts';
import ApiModelUtil from '@/utils/api-model.util.ts';
import PatchProjectTreeDto from '@/api/modules/project/dto/patch-project-tree.dto.ts';
import StartEditDto from '../dto/start-edit.dto';

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

  public async startEditing(idOrAccess: any): Promise<ApiResponseDto<StartEditDto>> {
    return await this.authorizedRequest(
      new ApiRequestDto(`/lumin/project/${idOrAccess}/start-edit`, 'GET')
    )
  }

  public async patchTree(
    id: number,
    patchProjectTreeDto: PatchProjectTreeDto,
  ): Promise<ApiResponseDto<ProjectDto>> {
    return await this.getOne(id);
    // return await this.authorizedRequest(
    //   new ApiRequestDto(
    //     `/lumin/project/${id}/tree`,
    //     'PATCH',
    //     patchProjectTreeDto,
    //   ),
    // );
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
}

export default new ProjectModel();
