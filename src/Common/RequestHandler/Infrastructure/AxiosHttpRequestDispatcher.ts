import axios from 'axios';
import {HttpRequestDispatcher, RequestExecutionSettings} from "Common/RequestHandler/Domain/HttpRequestHandler";
import {HttpRequestResponse, HttpRequest, HttpRequestMethods} from "Common/RequestHandler/Domain/Types";

export class AxiosHttpRequestDispatcher implements HttpRequestDispatcher {
    executeRequest(settings: RequestExecutionSettings): void {
        axios(createAxiosConfigFromExecutionSettings(settings))
            .then((response: AxiosResponse): void => {
                if (!settings.onSuccess) {
                    return;
                }
                const requestResponse = createRequestResponseFromAxiosResponse(settings.request, response);
                //@ts-ignore
                settings.onSuccess(requestResponse);
            })
            .catch((error: AxiosError): void => {
                if (!error.request) {
                    console.error(error);
                    return;
                }
                if (!settings.onError) {
                    return;
                }
                const requestResponse = createRequestResponseFromAxiosResponse(settings.request, error.response);
                settings.onError(requestResponse);
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

function getAxiosRequestMethodByRequest(request: HttpRequest): string {
    if(request.method === HttpRequestMethods.GET) {
        return 'get';
    }
    if(request.method === HttpRequestMethods.POST) {
        return 'post';
    }
    throw new Error('Method "' + request.method + '" not supported!');
}

function createRequestResponseFromAxiosResponse (request: HttpRequest, axiosResponse?: AxiosResponse): HttpRequestResponse {
    return {
        request: request,
        response: (!axiosResponse ? undefined : {
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