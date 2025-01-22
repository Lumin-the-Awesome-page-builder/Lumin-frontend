import { beforeEach, describe, expect, it } from 'vitest';
import CommandResultDto from '@/api/modules/docker/dto/command-result.dto.ts';

describe('Base commandResultDto class tests', () => {
  let commandResultDto: CommandResultDto;
  const errorData = 'ERROR';
  beforeEach(() => {
    commandResultDto = new CommandResultDto('401', 'Unauthorized', errorData);
  });
  it('Test apiErrorDto creation', () => {
    expect(commandResultDto.status).equal('401');
    expect(commandResultDto.stdout).equal('Unauthorized');
    expect(commandResultDto.stderr).equal(errorData);
  });
});
