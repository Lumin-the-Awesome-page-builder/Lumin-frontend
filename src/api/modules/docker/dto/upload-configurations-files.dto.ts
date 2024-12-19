export interface FileDto {
  name: string;
  file: string;
  extension: string;
}

export default class UploadConfigurationsFilesDto {
  constructor(
    public configuration_id: number,
    public files: FileDto[],
  ) {}
}
