import { beforeEach, describe, expect, it } from 'vitest';
import ConfigurationDto from '@/api/modules/docker/dto/configuration.dto.ts';

describe('Base configurationDto class tests', () => {
  let configurationDto: ConfigurationDto;
  beforeEach(() => {
    configurationDto = new ConfigurationDto(1, 'configuration-name', 'mapping');
  });
  it('Test apiErrorDto creation', () => {
    expect(configurationDto.id).equal(1);
    expect(configurationDto.name).equal('configuration-name');
    expect(configurationDto.mapping).equal('mapping');
  });
});
