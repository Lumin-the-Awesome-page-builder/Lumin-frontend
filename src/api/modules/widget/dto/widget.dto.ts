export default class WidgetDto {
  constructor(
    public id: number,
    public name: string,
    public isPublic: boolean,
    public date: number,
    public stars: number,
    public data: string,
    public tags: string[],
    public category_id: number,
    public imageSrc: string = '../src/assets/imageCard/screenshot.png',
  ) {}
}
