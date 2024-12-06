import { beforeEach, describe, expect, it, vi } from 'vitest';
import LibraryModel from '@/api/modules/library/models/library.model.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import LibraryProjectDto from '@/api/modules/library/dto/library-project.dto.ts';
import LibraryWidgetDto from '@/api/modules/library/dto/library-widget.dto.ts';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('Base LibraryModel class tests', () => {
  let apiResponseDto: ApiResponseDto<string>;
  const libraryModel = LibraryModel;
  beforeEach(() => {
    apiResponseDto = new ApiResponseDto(true, 'data', null);
    libraryModel.authorizedRequest = vi.fn(
      () =>
        new Promise<ApiResponseDto<any>>((resolve) => {
          resolve(apiResponseDto);
        }),
    );
  });

  describe('Test related dto', () => {
    it('Test LibraryProjectDto', () => {
      const libraryProjectDto = new LibraryProjectDto(
        1,
        'name',
        true,
        1,
        1,
        '',
      );

      expect(libraryProjectDto).toEqual({
        id: 1,
        name: 'name',
        isPublic: true,
        date: 1,
        stars: 1,
        preview: '',
      });
    });

    it('Test LibraryWidgetDto', () => {
      const libraryWidgetDto = new LibraryWidgetDto(1, 'name', true, 1, 1, '');

      expect(libraryWidgetDto).toEqual({
        id: 1,
        name: 'name',
        isPublic: true,
        date: 1,
        stars: 1,
        preview: '',
      });
    });
  });

  it('Test libraryModel creation', () => {
    delete libraryModel.authorizedRequest;

    expect(libraryModel).toEqual({
      baseEndpoint: '',
      baseEndpointBuffer: '',
      onRefresh: null,
    });
  });

  it('Test getProjects', async () => {
    const result = await libraryModel.getProjects();

    expect(result).toEqual({ ...apiResponseDto });
    expect(libraryModel.authorizedRequest).toBeCalledWith({
      url: '/lumin/user/library/projects',
      method: 'GET',
      data: null,
    });
  });

  it('Test getWidgets', async () => {
    const result = await libraryModel.getWidgets();

    expect(result).toEqual({ ...apiResponseDto });
    expect(libraryModel.authorizedRequest).toBeCalledWith({
      url: '/lumin/user/library/widgets',
      method: 'GET',
      data: null,
    });
  });
});
