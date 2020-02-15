import {ToastRepositoryInterface, ToastTypes} from "Common/Toaster/Domain/ToastRepository";
import {
    createWithHeaderEnhancedHttpRequest,
    ExecutionSummary as GeneralExecutionSummary,
    HttpRequestHandlerInterface,
    RequestExecutionSettings as GeneralRequestExecutionSettings
} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestHandling";

export type ExecutionSummary = GeneralExecutionSummary;
export type RequestExecutionSettings = (GeneralRequestExecutionSettings & {
    apiToken?: string
});

export class ApiHttpRequestHandler {
    private httpRequestHandler: HttpRequestHandlerInterface;
    private readonly toastRepository: ToastRepositoryInterface;

    constructor(httpRequestHandler: HttpRequestHandlerInterface, toastRepository: ToastRepositoryInterface) {
        this.httpRequestHandler = httpRequestHandler;
        this.toastRepository = toastRepository;
    }

    executeRequest(settings: RequestExecutionSettings): void {
        this.httpRequestHandler.executeRequest(createGeneralRequestExecutionSettings(settings, this.toastRepository));
    }
}

function createGeneralRequestExecutionSettings(
    settings: RequestExecutionSettings,
    toastRepository: ToastRepositoryInterface
): GeneralRequestExecutionSettings {
    let generalSettings = {
        request: (settings.apiToken
                ? createWithHeaderEnhancedHttpRequest(settings.request, 'X-API-TOKEN', settings.apiToken)
                : settings.request
        ),
        onError: (summary: ExecutionSummary): void => {
            dispatchToastErrorMessages(summary, toastRepository);
            if (settings.onError) {
                settings.onError(summary);
            }
        }
    };
    if (settings.onSuccess) {
        generalSettings = Object.assign({}, generalSettings, {
            onSuccess: settings.onSuccess
        });
    }
    return generalSettings;
}

function dispatchToastErrorMessages(summary: ExecutionSummary, toastRepository: ToastRepositoryInterface): void {
    if (!summary.response) {
        toastRepository.addToastMessage({
            content: 'Could not connect to server.', //todo: translate,
            type: ToastTypes.ERROR,
        });
        return;
    }
    //todo: extend with not authorized error and so on..
}