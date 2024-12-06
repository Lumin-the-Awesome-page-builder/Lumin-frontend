export default class UpdateProjectDto {
  constructor(
    public name: string,
    public data: string,
    public tags: string[],
    public category: number,
  ) {}
}
