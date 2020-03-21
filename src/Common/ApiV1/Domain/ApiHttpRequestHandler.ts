import {
    createGetRequest as generalCreateGetRequest,
    createPostRequest as generalCreatePostRequest,
    createPatchRequest as generalCreatePatchRequest,
    createWithHeaderEnhancedHttpRequest
} from "Common/RequestHandling/Domain/Command/RequestCreation";
import {
    HttpRequestHandler,
    RequestExecutionSettings as GeneralRequestExecutionSettings
} from "Common/RequestHandling/Domain/HttpRequestHandler";
import {HttpRequestResponse as GeneralHttpRequestResponse} from "Common/RequestHandling/Domain/Types";
import {BasicResponseBody} from "Common/ApiV1/Domain/Types";

export const createGetRequest = generalCreateGetRequest;
export const createPostRequest = generalCreatePostRequest;
export const createPatchRequest = generalCreatePatchRequest;

export type RequestResponse = GeneralHttpRequestResponse<BasicResponseBody>;
export type RequestExecutionSettings = (GeneralRequestExecutionSettings & {
    authToken?: string
});

export class ApiHttpRequestHandler {
    private httpRequestHandler: HttpRequestHandler;

    constructor(httpRequestHandler: HttpRequestHandler) {
        this.httpRequestHandler = httpRequestHandler;
    }

    executeRequest(settings: RequestExecutionSettings): void {
        this.httpRequestHandler.executeRequest(createGeneralRequestExecutionSettings(settings));
    }
}

function createGeneralRequestExecutionSettings(settings: RequestExecutionSettings): GeneralRequestExecutionSettings {
    let generalSettings = {
        request: (
            settings.authToken
                ? createWithHeaderEnhancedHttpRequest(settings.request, 'X-API-TOKEN', settings.authToken)
                : settings.request
        ),
        onError: (requestResponse: RequestResponse): void => {
            showRequestResponseMessages(requestResponse);
            if (settings.onError) {
                settings.onError(requestResponse);
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

function showRequestResponseMessages(requestResponse: RequestResponse): void {
    if (!requestResponse.response) {
        //toastRepository.addToastMessage({
            //content: 'Could not connect to server.', //todo: translate,
            //type: ToastTypes.ERROR,
        //});
        return;
    }
    //todo: extend with not authorized error and so on..
}

function showToastMessageByRequestResponseMessage =