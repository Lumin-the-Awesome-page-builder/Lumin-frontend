export default class LibraryWidgetDto {
  constructor(
    public id: number,
    public name: string,
    public isPublic: boolean,
    public date: number,
    public stars: number,
    public preview: string,
  ) {}
}
