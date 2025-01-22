import { beforeEach, describe, expect, it } from 'vitest';
import LibraryCategoriesDto from '@/api/modules/library/dto/libary-categories.dto.ts';

describe('Base apiErrorDto class tests', () => {
  let environmentDto: LibraryCategoriesDto;
  beforeEach(() => {
    environmentDto = new LibraryCategoriesDto(1, 'category-name');
  });
  it('Test apiErrorDto creation', () => {
    expect(environmentDto.id).equal(1);
    expect(environmentDto.name).equal('category-name');
  });
});
