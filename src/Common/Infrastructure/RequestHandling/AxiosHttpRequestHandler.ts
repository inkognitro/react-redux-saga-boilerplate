import axios from 'axios';
import {
    ExecutionSummary,
    Request, RequestHandlingActions,
    RequestHandlingActionTypes,
    RequestMethods
} from "Common/Application/RequestHandling/Redux/Types";
import {AppDispatch, AppThunk} from "Common/types";
import {HttpRequestHandler, RequestExecutionSettings} from "../../Application/RequestHandling/HttpRequestHandler";
import {
    GetRequestCreationSettings,
    createGetRequest,
    createPostRequest,
    createPutRequest,
    createPatchRequest,
    createDeleteRequest,
    PostRequestCreationSettings,
    PatchRequestCreationSettings,
    DeleteRequestCreationSettings,
    PutRequestCreationSettings
} from "Common/Application/RequestHandling/HttpRequestFactory";

export class AxiosHttpRequestHandler implements HttpRequestHandler {
    private dispatch: AppDispatch;

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch;
    }

    executeRequest(settings: RequestExecutionSettings): void {
        this.dispatch(executeAxiosRequest(settings));
    }

    createGetRequest(settings: GetRequestCreationSettings): Request {
        return createGetRequest(settings);
    }

    createPostRequest(settings: PostRequestCreationSettings): Request {
        return createPostRequest(settings);
    }

    createPatchRequest(settings: PatchRequestCreationSettings): Request {
        return createPatchRequest(settings);
    }

    createPutRequest(settings: PutRequestCreationSettings): Request {
        return createPutRequest(settings);
    }

    createDeleteRequest(settings: DeleteRequestCreationSettings): Request {
        return createDeleteRequest(settings);
    }
}

function executeAxiosRequest(settings: RequestExecutionSettings): AppThunk {
    return function(dispatch: AppDispatch) {
        const request = settings.request;
        dispatch(createSendRequestAction(settings.request));
        axios(createAxiosConfigFromExecutionSettings(settings))
            .then((response: AxiosResponse): void => {
                dispatch(createCloseRequestAction(settings.request.id));
                if(!settings.onSuccess) {
                    return;
                }
                const summary = createSummaryFromAxiosResponse(request, response);
                settings.onSuccess(summary);
            })
            .catch((error: AxiosError): void => {
                dispatch(createCloseRequestAction(settings.request.id));
                if(!error.request) {
                    console.error(error);
                    return;
                }
                if(!settings.onError) {
                    return;
                }
                const summary = createSummaryFromAxiosResponse(request, error.response);
                settings.onError(summary);
            });
    };
}

function createSendRequestAction(request: Request): RequestHandlingActions {
    return {
        type: RequestHandlingActionTypes.SEND_REQUEST,
        payload: {
            request: request,
        }
    };
}

function createCloseRequestAction(requestId: string): RequestHandlingActions {
    return {
        type: RequestHandlingActionTypes.CLOSE_REQUEST,
        payload: {
            requestId: requestId,
        }
    };
}

function createAxiosConfigFromExecutionSettings (settings: RequestExecutionSettings): object {
    const request = settings.request;
    let config = {
        method: getAxiosRequestMethodByRequest(request),
        url: request.url,
    };
    if(request.queryParameters) {
        config = Object.assign({}, config,{params: request.queryParameters});
    }
    if(request.headers) {
        config = Object.assign({}, config,{headers: request.headers});
    }
    if(request.hasOwnProperty('body')) {
        config = Object.assign({}, config,{data: request.body});
    }
    return config;
}

function getAxiosRequestMethodByRequest(request: Request): string {
    if(request.method === RequestMethods.GET) {
        return 'get';
    }
    if(request.method === RequestMethods.POST) {
        return 'post';
    }
    throw new Error('Method "' + request.method + '" not supported!');
}

function createSummaryFromAxiosResponse (request: Request, axiosResponse?: AxiosResponse): ExecutionSummary {
    return {
        request: request,
        response: (!axiosResponse ? null : {
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        })
    };
}

type AxiosError = {
    request?: object,
    response?: AxiosResponse,
    message: string,
};

type AxiosResponse = {
    status: number,
    data: object,
};