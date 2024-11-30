import { ExceptionReport } from './exception-report.ts'

class UnhandleRejection extends ExceptionReport {
    constructor(message: string, errorCode?: string) {
        super(message, errorCode);
    }
}
export default UnhandleRejection;