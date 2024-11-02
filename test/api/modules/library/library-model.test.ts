import { beforeEach, describe, expect, it, vi } from 'vitest';
import LibraryModel from '@/api/modules/library/models/library.model.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import LibraryProjectDto from '@/api/modules/library/dto/library-project.dto.ts';
import LibraryWidgetDto from '@/api/modules/library/dto/library-widget.dto.ts';

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
      const libraryProjectDto = new LibraryProjectDto(1, 'name', true, 1, 1);

      expect(libraryProjectDto).toEqual({
        id: 1,
        name: 'name',
        isPublic: true,
        date: 1,
        stars: 1,
        imageSrc: '../src/assets/imageCard/screenshot.png',
      });
    });

    it('Test LibraryWidgetDto', () => {
      const libraryWidgetDto = new LibraryWidgetDto(1, 'name', true, 1, 1);

      expect(libraryWidgetDto).toEqual({
        id: 1,
        name: 'name',
        isPublic: true,
        date: 1,
        stars: 1,
        imageSrc: '../src/assets/imageCard/screenshot.png',
      });
    });
  });

  it('Test libraryModel creation', () => {
    delete libraryModel.authorizedRequest;

    expect(libraryModel).toEqual({
      baseEndpoint: '/lumin/user/library',
      baseEndpointBuffer: '',
      onRefresh: null,
    });
  });

  it('Test getProjects', async () => {
    const result = await libraryModel.getProjects();

    expect(result).toEqual({ ...apiResponseDto });
    expect(libraryModel.authorizedRequest).toBeCalledWith({
      url: '/projects',
      method: 'GET',
      data: null,
    });
  });

  it('Test getWidgets', async () => {
    const result = await libraryModel.getWidgets();

    expect(result).toEqual({ ...apiResponseDto });
    expect(libraryModel.authorizedRequest).toBeCalledWith({
      url: '/widgets',
      method: 'GET',
      data: null,
    });
  });
});
