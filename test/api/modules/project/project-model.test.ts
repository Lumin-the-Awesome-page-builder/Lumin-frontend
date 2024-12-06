import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProjectModel from '@/api/modules/project/models/project.model.ts';
import CreateProjectDto from '@/api/modules/project/dto/create-project.dto.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';
import UpdateProjectDto from '@/api/modules/project/dto/update-project.dto.ts';
import ProjectDto from '@/api/modules/project/dto/project.dto.ts';
import PatchProjectTreeDto from '@/api/modules/project/dto/patch-project-tree.dto.ts';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('ProjectModel class tests', () => {
  let apiResponseDto: ApiResponseDto<string>;
  const projectModel = ProjectModel;
  beforeEach(() => {
    apiResponseDto = new ApiResponseDto(true, 'data', null);
    projectModel.authorizedRequest = vi.fn(
      () =>
        new Promise<ApiResponseDto<any>>((resolve) => {
          resolve(apiResponseDto);
        }),
    );
  });

  describe('Test related dto', () => {
    it('Test createProjectDto creation', () => {
      const createProjectDto: CreateProjectDto = new CreateProjectDto(
        'name',
        'data',
        ['tag'],
        1,
      );

      expect(createProjectDto).toEqual({
        name: 'name',
        data: 'data',
        tags: ['tag'],
        category_id: 1,
      });
    });

    it('Test UpdateProjectDto creation', () => {
      const updateProjectDto: UpdateProjectDto = new UpdateProjectDto(
        'name',
        'data',
        ['tag'],
        1,
      );

      expect(updateProjectDto).toEqual({
        name: 'name',
        data: 'data',
        tags: ['tag'],
        category: 1,
      });
    });

    it('Test ProjectDto creation', () => {
      const projectDto: ProjectDto = new ProjectDto(
        1,
        'name',
        true,
        1,
        '',
        1,
        'data',
        ['tag'],
        1,
      );

      expect(projectDto).toEqual({
        id: 1,
        name: 'name',
        isPublic: true,
        date: 1,
        preview: '',
        stars: 1,
        data: 'data',
        tags: ['tag'],
        category_id: 1,
      });
    });

    it('Test project patch tree dto', () => {
      //@ts-ignore
      const patchTree = new PatchProjectTreeDto(['test'], {});

      expect(patchTree).toEqual({
        path: ['test'],
        data: {},
      });
    });
  });

  it('Test projectModel creation', () => {
    delete projectModel.authorizedRequest;

    expect(projectModel).toEqual({
      baseEndpoint: '',
      baseEndpointBuffer: '',
      onRefresh: null,
    });
  });

  it('Test create', async () => {
    const createdProjectDto = new CreateProjectDto('name', 'data', ['tag'], 1);

    const result = await projectModel.create(createdProjectDto);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(projectModel.authorizedRequest).toBeCalledWith({
      url: '/lumin/project',
      method: 'POST',
      data: createdProjectDto,
    });
  });

  it('Test update', async () => {
    const updateProjectDto = new UpdateProjectDto('name', 'data', ['tag'], 1);
    const id = 1;

    const result = await projectModel.update(id, updateProjectDto);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(projectModel.authorizedRequest).toBeCalledWith({
      url: `/lumin/project/${id}`,
      method: 'PATCH',
      data: updateProjectDto,
    });
  });

  it('Test delete', async () => {
    const id = 1;

    const result = await projectModel.delete(id);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(projectModel.authorizedRequest).toBeCalledWith({
      url: `/lumin/project/${id}`,
      method: 'DELETE',
      data: null,
    });
  });

  it('Test getOne', async () => {
    const id = 1;

    const result = await projectModel.getOne(id);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(projectModel.authorizedRequest).toBeCalledWith({
      url: `/lumin/project/${id}`,
      method: 'GET',
      data: null,
    });
  });

  it('Test patch tree', async () => {
    const id = 1;
    //@ts-ignore
    const data = new PatchProjectTreeDto(['test'], {});

    const result = await projectModel.patchTree(id, data);

    expect(result).toEqual({
      ...apiResponseDto,
    });
    expect(projectModel.authorizedRequest).toBeCalledWith({
      url: `/lumin/project/${id}/tree`,
      method: 'PATCH',
      data,
    });
  });
});
