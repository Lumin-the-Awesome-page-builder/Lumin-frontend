import { beforeEach, describe, expect, it } from 'vitest';
import CreateFromConfigurationDto from '@/api/modules/docker/dto/create-from-configuration.dto.ts';

describe('Base apiErrorDto class tests', () => {
  let createDto: CreateFromConfigurationDto;
  beforeEach(() => {
    createDto = new CreateFromConfigurationDto(1, 'container-name', [
      { '123': '123' },
    ]);
  });
  it('Test apiErrorDto creation', () => {
    expect(createDto.configurationId).equal(1);
    expect(createDto.name).equal('container-name');
  });
});
