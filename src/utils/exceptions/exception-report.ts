import ApiResponseDto from "@/api/dto/api-response.dto.ts";
import ApiRequestDto from "@/api/dto/api-request.dto.ts";
import ExceptionReportDto from "@/utils/exceptions/dto/exception-report-dto.ts";
import ApiModelUtil from "@/utils/api-model.util.ts";

class ExceptionSender extends ApiModelUtil {
    constructor() {
        super('');
    }
    public async send(exceptionReportDto: ExceptionReportDto): Promise<ApiResponseDto> {
        return await this.unauthorizedRequest<string>(
            new ApiRequestDto('/auth/report', 'POST', exceptionReportDto),
        );

    }
}

export class ExceptionReport extends Error {
    errorCode?: string;

    private sender = new ExceptionSender()

    constructor(message: string, errorCode?: string) {
        super(message);
        this.name = this.constructor.name;
        this.errorCode = errorCode;


        this.sender.send(
            new ExceptionReportDto(
                this.name,
                this.message,
                this.errorCode,
                navigator.userAgent,
                window.location.href,
                this.stack.slice(0, 100)
            )
        )
    }
}