import { beforeEach, describe, expect, it } from 'vitest';
import EnvironmentDto from '@/api/modules/docker/dto/environment.dto.ts';

describe('Base apiErrorDto class tests', () => {
  let environmentDto: EnvironmentDto;
  beforeEach(() => {
    environmentDto = new EnvironmentDto(1, 'environment-name', 123);
  });
  it('Test apiErrorDto creation', () => {
    expect(environmentDto.id).equal(1);
    expect(environmentDto.name).equal('environment-name');
    expect(environmentDto.created_at).equal(123);
  });
});
