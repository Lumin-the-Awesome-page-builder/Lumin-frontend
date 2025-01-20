import { beforeEach, describe, expect, it } from 'vitest';
import StartEditDto from '@/api/modules/project/dto/start-edit.dto.ts';
import ProjectDto from '@/api/modules/project/dto/project.dto.ts';

describe('Base apiErrorDto class tests', () => {
  let patchProjectShareSettingsDto: StartEditDto;
  const project = new ProjectDto(
    1,
    'name',
    false,
    1234567890,
    'preview',
    0,
    'data',
    ['q'],
    1,
    false,
    false,
  );
  beforeEach(() => {
    patchProjectShareSettingsDto = new StartEditDto(project, 'tree', 'access');
  });
  it('Test apiErrorDto creation', () => {
    expect(patchProjectShareSettingsDto.project).equal(project);
    expect(patchProjectShareSettingsDto.tree).equal('tree');
    expect(patchProjectShareSettingsDto.access).equal('access');
  });
});
