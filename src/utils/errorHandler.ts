import WindowError from "@/utils/exceptions/window-error.ts";
import UnhandleRejection from "@/utils/exceptions/unhandle-rejection.ts";

window.addEventListener('error', (error) => {
    throw new WindowError(error.message, '')
});

window.addEventListener('unhandledrejection', (error) => {
    const reason = error.reason instanceof Error ? error.reason.stack : error.reason;
    throw new UnhandleRejection(reason, '');
});
