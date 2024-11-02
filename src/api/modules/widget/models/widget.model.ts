import CreateWidgetDto from '@/api/modules/widget/dto/create-widget.dto.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import WidgetDto from '@/api/modules/widget/dto/widget.dto.ts';
import UpdateWidgetDto from '@/api/modules/widget/dto/update-widget.dto.ts';
import ApiModelUtil from '@/utils/api-model.util.ts';
import ApiRequestDto from '@/api/dto/api-request.dto.ts';

export class WidgetModel extends ApiModelUtil {
  constructor() {
    super('/lumin/widget');
  }

  public async create(
    data: CreateWidgetDto,
  ): Promise<ApiResponseDto<WidgetDto>> {
    return await this.authorizedRequest(new ApiRequestDto('', 'POST', data));
  }

  public async update(
    id: number,
    data: UpdateWidgetDto,
  ): Promise<ApiResponseDto<WidgetDto>> {
    return await this.authorizedRequest(
      new ApiRequestDto(`/${id}`, 'PATCH', data),
    );
  }

  public async delete(id: number): Promise<ApiResponseDto<{ status: any }>> {
    return await this.authorizedRequest(new ApiRequestDto(`/${id}`, 'DELETE'));
  }

  public async getOne(id: number): Promise<ApiResponseDto<WidgetDto>> {
    return await this.authorizedRequest(new ApiRequestDto(`/${id}`, 'GET'));
  }
}

export default new WidgetModel();
