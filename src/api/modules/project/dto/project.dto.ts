export default class ProjectDto {
  constructor(
    public id: number,
    public name: string,
    public isPublic: boolean,
    public date: number,
    public preview: string,
    public stars: number,
    public data: string,
    public tags: string[],
    public category_id: number,
    public shared: boolean,
    public shared_marketplace: boolean,
  ) {}
}
