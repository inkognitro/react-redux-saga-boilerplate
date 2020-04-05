import axios from 'axios';
import {HttpRequestResponse, HttpRequest, HttpRequestMethods} from "Common/RequestHandling/Domain/Http/Types";
import {HttpRequestDispatcher} from "Common/RequestHandling/Domain/Http/HttpRequestDispatcher";

export class AxiosHttpRequestDispatcher implements HttpRequestDispatcher {
    executeRequest(request: HttpRequest): Promise<HttpRequestResponse> {
        return new Promise((resolve) => {
            axios(createAxiosConfigFromExecutionSettings(request))
                .then((response: AxiosResponse): void => {
                    const requestResponse = createRequestResponseFromAxiosResponse(request, response);
                    resolve(requestResponse);
                })
                .catch((error: AxiosError): void => {
                    if (!error.request) {
                        console.error('Wrong axios configuration!', error);
                    }
                    const requestResponse = createRequestResponseFromAxiosResponse(request, error.response);
                    resolve(requestResponse);
                });
        });
    }
}

function createAxiosConfigFromExecutionSettings (request: HttpRequest): object {
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