import {ToastRepositoryInterface, ToastTypes} from "Common/Toaster/Domain/ToastRepository";
import {
    createGetRequest as generalCreateGetRequest,
    createPostRequest as generalCreatePostRequest,
    createWithHeaderEnhancedHttpRequest,
    ExecutionSummary as GeneralExecutionSummary,
    HttpRequestManagerInterface,
    RequestExecutionSettings as GeneralRequestExecutionSettings
} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";

export enum API_ENDPOINT_URLS {
    AUTH_AUTHENTICATE = '//localhost:3000/auth/authenticate.json',
    AUTH_REFRESH_TOKEN = '//localhost:3000/auth/refreshtoken.json',
}

export const createGetRequest = generalCreateGetRequest;
export const createPostRequest = generalCreatePostRequest;

export type ExecutionSummary = GeneralExecutionSummary;
export type RequestExecutionSettings = (GeneralRequestExecutionSettings & {
    apiToken?: string
});

export class ApiHttpRequestManager {
    private httpRequestHandler: HttpRequestManagerInterface;
    private readonly toastRepository: ToastRepositoryInterface;

    constructor(httpRequestHandler: HttpRequestManagerInterface, toastRepository: ToastRepositoryInterface) {
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