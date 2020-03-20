import {
    createGetRequest as generalCreateGetRequest,
    createPostRequest as generalCreatePostRequest,
    createWithHeaderEnhancedHttpRequest
} from "Common/RequestHandling/Domain/Command/RequestCreation";
import {HttpRequestHandler} from "Common/RequestHandling/Domain/HttpRequestHandler";
import {HttpRequestResponse as GeneralHttpRequestResponse} from "Common/RequestHandling/Domain/Types";

export const createGetRequest = generalCreateGetRequest;
export const createPostRequest = generalCreatePostRequest;

export type ExecutionSummary = GeneralHttpRequestResponse;
export type RequestExecutionSettings = (GeneralRequestExecutionSettings & {
    apiToken?: string
});

export class ApiHttpRequestHandler {
    private httpRequestManager: HttpRequestHandler;

    constructor(httpRequestManager: HttpRequestManagerInterface) {
        this.httpRequestManager = httpRequestManager;
    }

    executeRequest(settings: RequestExecutionSettings): void {
        this.httpRequestManager.executeRequest(createGeneralRequestExecutionSettings(settings));
    }
}

function createGeneralRequestExecutionSettings(settings: RequestExecutionSettings,): GeneralRequestExecutionSettings {
    let generalSettings = {
        request: (settings.apiToken
                ? createWithHeaderEnhancedHttpRequest(settings.request, 'X-API-TOKEN', settings.apiToken)
                : settings.request
        ),
        onError: (summary: ExecutionSummary): void => {
            dispatchToastErrorMessages(summary);
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

function dispatchToastErrorMessages(summary: ExecutionSummary): void {
    if (!summary.response) {
        //toastRepository.addToastMessage({
            //content: 'Could not connect to server.', //todo: translate,
            //type: ToastTypes.ERROR,
        //});
        return;
    }
    //todo: extend with not authorized error and so on..
}