export default class CreateFromConfigurationDto {
  constructor(
    public configurationId: number,
    public name: string,
    public files: Record<string, string>,
  ) {}
}
