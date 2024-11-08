import { beforeEach, describe, expect, it, vi } from 'vitest';
import WidgetModel from '@/api/modules/widget/models/widget.model.ts';
import CreateWidgetDto from '@/api/modules/widget/dto/create-widget.dto.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import UpdateWidgetDto from '@/api/modules/widget/dto/update-widget.dto.ts';
import WidgetDto from '@/api/modules/widget/dto/widget.dto.ts';

vi.mock("codemirror-editor-vue3", async () => {
  return {
    default: (await import('@/components/editor/UI/CodeMirrorMock.vue'))
  }
})

describe('WidgetModel class tests', () => {
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

  describe('Test related dto', () => {
    it('Test createWidgetDto creation', () => {
      const createWidgetDto: CreateWidgetDto = new CreateWidgetDto(
        'name',
        'data',
        ['tag'],
        1,
      );

      expect(createWidgetDto).toEqual({
        name: 'name',
        data: 'data',
        tags: ['tag'],
        category: 1,
      });
    });

    it('Test UpdateWidgetDto creation', () => {
      const updateWidgetDto: UpdateWidgetDto = new UpdateWidgetDto(
        'name',
        'data',
        ['tag'],
        1,
      );

      expect(updateWidgetDto).toEqual({
        name: 'name',
        data: 'data',
        tags: ['tag'],
        category: 1,
      });
    });

    it('Test WidgetDto creation', () => {
      const widgetDto: WidgetDto = new WidgetDto(
        1,
        'name',
        true,
        1,
        1,
        'data',
        ['tag'],
        1,
      );

      expect(widgetDto).toEqual({
        id: 1,
        name: 'name',
        isPublic: true,
        date: 1,
        stars: 1,
        data: 'data',
        tags: ['tag'],
        category_id: 1,
        imageSrc: '../src/assets/imageCard/screenshot.png',
      });
    });
  });

  it('Test widgetModel creation', () => {
    delete widgetModel.authorizedRequest;

    expect(widgetModel).toEqual({
      baseEndpoint: '',
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
      url: '/lumin/widget',
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
      url: `/lumin/widget/${id}`,
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
      url: `/lumin/widget/${id}`,
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
      url: `/lumin/widget/${id}`,
      method: 'GET',
      data: null,
    });
  });
});
