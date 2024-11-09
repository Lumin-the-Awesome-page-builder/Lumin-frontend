export default class CreateWidgetDto {
  constructor(
    public name: string,
    public data: string,
    public tags: string[],
    public category: number,
    public preview: string,
  ) {}
}
