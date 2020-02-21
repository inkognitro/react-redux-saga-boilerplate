import axios from 'axios';
import {
    ExecutionSummary,
    Request, HttpRequestDispatcherInterface,
    RequestExecutionSettings, RequestMethods
} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";

export class AxiosHttpRequestDispatcher implements HttpRequestDispatcherInterface {
    executeRequest(settings: RequestExecutionSettings): void {
        axios(createAxiosConfigFromExecutionSettings(settings))
            .then((response: AxiosResponse): void => {
                if (!settings.onSuccess) {
                    return;
                }
                const summary = createSummaryFromAxiosResponse(settings.request, response);
                settings.onSuccess(summary);
            })
            .catch((error: AxiosError): void => {
                if (!error.request) {
                    console.error(error);
                    return;
                }
                if (!settings.onError) {
                    return;
                }
                const summary = createSummaryFromAxiosResponse(settings.request, error.response);
                settings.onError(summary);
            });
    }
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