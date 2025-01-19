import { beforeEach, describe, expect, it } from 'vitest';
import ContainerDto from '@/api/modules/docker/dto/container.dto.ts';

describe('Base containerDto class tests', () => {
  let containerDto: ContainerDto;
  beforeEach(() => {
    containerDto = new ContainerDto(1, 'container-name', 'status');
  });
  it('Test apiErrorDto creation', () => {
    expect(containerDto.id).equal(1);
    expect(containerDto.name).equal('container-name');
    expect(containerDto.status).equal('status');
  });
});
