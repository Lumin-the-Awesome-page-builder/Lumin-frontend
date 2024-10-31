export default class UpdateWidgetDto {
  constructor(
    public name: string,
    public data: string,
    public tags: string[],
    public category: number,
  ) {}
}
