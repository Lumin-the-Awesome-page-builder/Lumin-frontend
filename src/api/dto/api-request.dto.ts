export default class ApiRequestDto {
  constructor(
    public url: string,
    public method: string,
    public data: any | null = null,
  ) {}
}
