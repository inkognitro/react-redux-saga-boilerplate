import {
    createWithHeaderEnhancedRequest,
    GetRequestCreationSettings, PatchRequestCreationSettings,
    PostRequestCreationSettings
} from "Common/Application/RequestHandling/HttpRequestFactory";
import {findApiToken} from "Common/Application/Auth/Redux/Selectors";
import {store} from "SinglePageApp/App";
import {addToastMessage} from "Common/Application/Layout/Redux/Toaster/Actions";
import {ToastTypes} from "Common/Application/Layout/Redux/Toaster/Types";
import {ExecutionSummary, Request} from "Common/Application/RequestHandling/Redux/Types";
import {HttpRequestHandler, RequestExecutionSettings} from "Common/Application/RequestHandling/HttpRequestHandler";

export class ApiHttpRequestHandler {
    private httpRequestHandler: HttpRequestHandler;

    constructor(httpRequestHandler: HttpRequestHandler) {
        this.httpRequestHandler = httpRequestHandler;
    }

    createGetRequest(settings: GetRequestCreationSettings): Request {
        return this.httpRequestHandler.createGetRequest(settings);
    }

    createPostRequest(settings: PostRequestCreationSettings): Request {
        return this.httpRequestHandler.createPostRequest(settings);
    }
    
    createPatchRequest(settings: PatchRequestCreationSettings): Request {
        return this.httpRequestHandler.createPatchRequest(settings);
    }

    executeRequest(settings: RequestExecutionSettings): void {
        const apiRequestExecutionSettings = Object.assign({}, settings, {
            request: createWithApiTokenHeaderEnhancedRequest(settings.request),
            onError: (summary: ExecutionSummary): void  => {
                dispatchToastErrorMessages(summary);
                if(settings.onError) {
                    settings.onError(summary);
                }
            }
        });
        this.httpRequestHandler.executeRequest(apiRequestExecutionSettings);
    }
}

const API_TOKEN_HEADER_NAME = 'X-API-TOKEN';

function createWithApiTokenHeaderEnhancedRequest(request: Request): Request {
    //@ts-ignore
    if(request.headers && request.headers[API_TOKEN_HEADER_NAME]) {
        return request;
    }
    const reduxState = store.getState();
    const apiToken = findApiToken(reduxState.auth);
    if(!apiToken) {
        return request;
    }
    return createWithHeaderEnhancedRequest(request, API_TOKEN_HEADER_NAME, apiToken);
}

function dispatchToastErrorMessages (summary: ExecutionSummary): void {
    if(!summary.response) {
        //@ts-ignore
        store.dispatch(addToastMessage({
            content: 'Could not connect to server.', //todo: translate,
            type: ToastTypes.ERROR,
        }));
        return;
    }
    //todo: extend with not authorized error and so on..
}