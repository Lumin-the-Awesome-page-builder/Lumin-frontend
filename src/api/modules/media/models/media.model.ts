import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiModelUtil from "@/utils/api-model.util";

class MediaModel extends ApiModelUtil {
    constructor() {
        super("")
    }

    public async getMedia() {
        return await this.authorizedRequest(
            new ApiRequestDto("/lumin/media", "GET")
        )
    }

    public async uploadMedia(name: string, data: string) {
        return await this.authorizedRequest(
            new ApiRequestDto("/lumin/media", "POST", { name, base64: data })
        )
    }

    public async getAttached(project: number) {
        return await this.authorizedRequest(
            new ApiRequestDto(`/lumin/media/attached/${project}`, "GET")
        )
    }

    public async attachMedia(media: number, project: number) {
        return await this.authorizedRequest(
            new ApiRequestDto(`/lumin/media/attach/${project}/${media}`, "POST")
        )
    }

    
    public async removeFromProject(media: number, project: number) {
        return await this.authorizedRequest(
            new ApiRequestDto(`/lumin/media/attach/${project}/${media}`, "DELETE")
        )
    }
}

export default new MediaModel()