import ProjectDto from "./project.dto";

export default class StartEditDto {
    constructor(
        public project: ProjectDto,
        public tree: string,
        public access: string
    ) {}
}