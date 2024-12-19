import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiModelUtil from "@/utils/api-model.util";

export default class FormsModel extends ApiModelUtil {
    constructor() {
        super('')
    }

    public async saveForm(projectId: number, formData: any) {
        return await this.authorizedRequest<any>(
            new ApiRequestDto(`/lumin/form/${projectId}`, 'POST', {
                "name": formData.name,
                "fields": formData.inputs,
                "url-post": formData.save_url,
                "url-get": formData.get_url
            })
        )
    }


    public async saveFormServiceBased(projectId: number, formData: any) {
        return await this.authorizedRequest<any>(
            new ApiRequestDto(`/lumin/form/${projectId}`, 'POST', {
                "name": formData.name,
                "fields": formData.inputs
            })
        )
    }

    public async updateForm(projectId: number, formData: any) {
        return await this.authorizedRequest<any>(
            new ApiRequestDto(`/lumin/form/${projectId}/update/${formData.id}`, 'POST', {
                "name": formData.name,
                "fields": formData.inputs,
                "url-post": formData.save_url,
                "url-get": formData.get_url
            })
        )
    }

    public async updateFormServiceBased(projectId: number, formData: any) {
        return await this.authorizedRequest<any>(
            new ApiRequestDto(`/lumin/form/${projectId}/update/${formData.id}`, 'POST', {
                "name": formData.name,
                "fields": formData.inputs
            })
        )
    }
}