import { ExceptionReport } from './exception-report.ts'

class ValidationException extends ExceptionReport {
    constructor(message: string, errorCode?: string) {
        super(message, errorCode);
    }
}
export default ValidationException;