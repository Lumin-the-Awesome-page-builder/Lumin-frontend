export default class EnvironmentDto {
  constructor(
    public id: number,
    public name: string,
    public created_at: number | null,
  ) {}
}
