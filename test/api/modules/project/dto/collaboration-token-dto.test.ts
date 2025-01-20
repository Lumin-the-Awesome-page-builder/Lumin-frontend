import { beforeEach, describe, expect, it } from 'vitest';
import CollaborationTokenDto from '@/api/modules/project/dto/collaboration-token.dto.ts';

describe('Base collaborationTokenDto class tests', () => {
  let collaborationTokenDto: CollaborationTokenDto;
  beforeEach(() => {
    collaborationTokenDto = new CollaborationTokenDto('token');
  });
  it('Test apiErrorDto creation', () => {
    expect(collaborationTokenDto.access_token).equal('token');
  });
});
