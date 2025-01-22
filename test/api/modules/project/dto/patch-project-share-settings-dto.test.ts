import { beforeEach, describe, expect, it } from 'vitest';
import PatchProjectShareSettingsDto from '@/api/modules/project/dto/patch-project-share-settings.dto.ts';

describe('Base apiErrorDto class tests', () => {
  let patchProjectShareSettingsDto: PatchProjectShareSettingsDto;
  beforeEach(() => {
    patchProjectShareSettingsDto = new PatchProjectShareSettingsDto(
      false,
      true,
    );
  });
  it('Test apiErrorDto creation', () => {
    expect(patchProjectShareSettingsDto.collaboration).equal(false);
    expect(patchProjectShareSettingsDto.marketplace).equal(true);
  });
});
