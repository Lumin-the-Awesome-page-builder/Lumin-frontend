import { beforeEach, describe, expect, it, vi } from 'vitest';
import WidgetModel from '@/api/modules/widget/models/widget.model.ts';
import CreateWidgetDto from '@/api/modules/widget/dto/create-widget.dto.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import UpdateWidgetDto from '@/api/modules/widget/dto/update-widget.dto.ts';

describe('Base WidgetModel class tests', () => {
  let apiResponseDto: ApiResponseDto<string>;
  const widgetModel = WidgetModel;
  beforeEach(() => {
    apiResponseDto = new ApiResponseDto(true, 'data', null);
    widgetModel.authorizedRequest = vi.fn(
      () =>
        new Promise<ApiResponseDto<any>>((resolve) => {
          resolve(apiResponseDto);
        }),
    );
  });

  it('Test widgetModel creation', () => {
    delete widgetModel.authorizedRequest;

    expect(widgetModel).toEqual({
      baseEndpoint: '/widget',
      baseEndpointBuffer: '',
      onRefresh: null,
    });
  });

  it('Test create', async () => {
    const createdWidgetDto = new CreateWidgetDto('name', 'data', ['tag'], 1);

    const result = await widgetModel.create(createdWidgetDto);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(widgetModel.authorizedRequest).toBeCalledWith({
      url: '',
      method: 'POST',
      data: createdWidgetDto,
    });
  });

  it('Test update', async () => {
    const updateWidgetDto = new UpdateWidgetDto('name', 'data', ['tag'], 1);
    const id = 1;

    const result = await widgetModel.update(id, updateWidgetDto);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(widgetModel.authorizedRequest).toBeCalledWith({
      url: `/${id}`,
      method: 'PATCH',
      data: updateWidgetDto,
    });
  });

  it('Test delete', async () => {
    const id = 1;

    const result = await widgetModel.delete(id);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(widgetModel.authorizedRequest).toBeCalledWith({
      url: `/${id}`,
      method: 'DELETE',
      data: null,
    });
  });

  it('Test getOne', async () => {
    const id = 1;

    const result = await widgetModel.getOne(id);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(widgetModel.authorizedRequest).toBeCalledWith({
      url: `/${id}`,
      method: 'GET',
      data: null,
    });
  });
});
