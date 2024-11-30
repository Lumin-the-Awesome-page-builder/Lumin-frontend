import { ExceptionReport } from './exception-report.ts'

class NetworkException extends ExceptionReport {
    constructor(message: string, errorCode?: string) {
        super(message, errorCode);
    }
}
export default NetworkException;