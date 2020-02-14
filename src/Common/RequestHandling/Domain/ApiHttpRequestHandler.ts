import {
    createWithHeaderEnhancedRequest,
    GetRequestCreationSettings, PatchRequestCreationSettings,
    PostRequestCreationSettings
} from "Common/RequestHandling/Domain/HttpRequestFactory";
import {createAddToastMessageThunk} from "Common/Toaster/Domain/Actions";
import {ExecutionSummary, Request} from "Common/RequestHandling/Domain/Types";
import {HttpRequestHandler, RequestExecutionSettings} from "Common/RequestHandling/Domain/HttpRequestHandler";
import {AppDispatch} from "Common/types";
import {ToastTypes} from "Common/Toaster/Application/ToastRepository";

type CurrentApiTokenSelector = () => (null | string);

export class ApiHttpRequestHandler {
    private httpRequestHandler: HttpRequestHandler;
    private readonly dispatch: AppDispatch;
    private readonly findCurrentApiToken: CurrentApiTokenSelector;

    constructor(
        httpRequestHandler: HttpRequestHandler,
        dispatch: AppDispatch,
        findCurrentApiToken: CurrentApiTokenSelector
    ) {
        this.httpRequestHandler = httpRequestHandler;
        this.dispatch = dispatch;
        this.findCurrentApiToken = findCurrentApiToken;
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
            request: createWithApiTokenHeaderEnhancedRequest(settings.request, this.findCurrentApiToken),
            onError: (summary: ExecutionSummary): void => {
                dispatchToastErrorMessages(summary, this.dispatch);
                if (settings.onError) {
                    settings.onError(summary);
                }
            }
        });
        this.httpRequestHandler.executeRequest(apiRequestExecutionSettings);
    }
}

const API_TOKEN_HEADER_NAME = 'X-API-TOKEN';

function createWithApiTokenHeaderEnhancedRequest(request: Request, findCurrentApiToken: CurrentApiTokenSelector): Request {
    //@ts-ignore
    if (request.headers && request.headers[API_TOKEN_HEADER_NAME]) {
        return request;
    }
    const apiToken = findCurrentApiToken();
    if (!apiToken) {
        return request;
    }
    return createWithHeaderEnhancedRequest(request, API_TOKEN_HEADER_NAME, apiToken);
}

function dispatchToastErrorMessages(summary: ExecutionSummary, dispatch: AppDispatch): void {
    if (!summary.response) {
        //@ts-ignore
        dispatch(createAddToastMessageThunk({
            content: 'Could not connect to server.', //todo: translate,
            type: ToastTypes.ERROR,
        }));
        return;
    }
    //todo: extend with not authorized error and so on..
}