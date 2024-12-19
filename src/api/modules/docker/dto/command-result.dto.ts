export default class CommandResultDto {
  constructor(
    public status: string,
    public stdout: string,
    public stderr: string,
  ) {}
}
