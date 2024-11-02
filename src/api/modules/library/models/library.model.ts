import ApiModelUtil from '@/utils/api-model.util.ts';
import LibraryProjectDto from '@/api/modules/library/dto/library-project.dto.ts';
import LibraryWidgetDto from '@/api/modules/library/dto/library-widget.dto.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import ApiRequestDto from '@/api/dto/api-request.dto.ts';

export class LibraryModel extends ApiModelUtil {
  constructor() {
    super('/lumin/user/library');
  }

  public async getProjects(): Promise<ApiResponseDto<LibraryProjectDto>> {
    return await this.authorizedRequest(new ApiRequestDto('/projects', 'GET'));
  }

  public async getWidgets(): Promise<ApiResponseDto<LibraryWidgetDto>> {
    return await this.authorizedRequest(new ApiRequestDto('/widgets', 'GET'));
  }
}

export default new LibraryModel();
