import axios from 'axios';
import {
    RequestHandlingActions,
    RequestHandlingActionTypes
} from "Common/RequestHandling/Domain/HttpRequestHandling/Types";
import {AppThunk} from "Common/types";
import {
    ExecutionSummary,
    Request,
    RequestMethods
} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";

export type RequestExecutionSettings = {
    request: Request,
    onSuccess?(summary: ExecutionSummary): void,
    onError?(summary: ExecutionSummary): void,
};

export function executeRequest(settings: RequestExecutionSettings): AppThunk {
    return function(dispatch) {
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