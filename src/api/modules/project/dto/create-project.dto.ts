export default class CreateProjectDto {
  constructor(
    public name: string,
    public data: string,
    public tags: string[],
    public category_id: number,
  ) {}
}
