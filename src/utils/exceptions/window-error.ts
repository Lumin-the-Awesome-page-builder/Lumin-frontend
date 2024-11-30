import { ExceptionReport } from './exception-report.ts'

class WindowError extends ExceptionReport {
    constructor(message: string, errorCode?: string) {
        super(message, errorCode);
    }
}
export default WindowError;