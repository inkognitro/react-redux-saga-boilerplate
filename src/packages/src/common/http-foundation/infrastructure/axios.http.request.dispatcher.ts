import axios from 'axios';
import { RequestResponse, Request, RequestMethods, HttpRequestDispatcher } from '../domain';

type AxiosError = {
    request?: object;
    response?: AxiosResponse;
    message: string;
};

type AxiosResponse = {
    status: number;
    data: object;
};

function getAxiosRequestMethodByRequest(request: Request): string {
    if (request.method === RequestMethods.GET) {
        return 'get';
    }
    if (request.method === RequestMethods.POST) {
        return 'post';
    }
    if (request.method === RequestMethods.PATCH) {
        return 'patch';
    }
    if (request.method === RequestMethods.PUT) {
        return 'put';
    }
    if (request.method === RequestMethods.DELETE) {
        return 'delete';
    }
    throw new Error(`Method "${request.method}" not supported!`);
}

function createRequestResponseFromAxiosResponse(request: Request, axiosResponse?: AxiosResponse): RequestResponse {
    return {
        request,
        response: !axiosResponse
            ? undefined
            : {
                  headers: { statusCode: axiosResponse.status },
                  body: axiosResponse.data,
              },
    };
}

function createAxiosConfigFromExecutionSettings(request: Request): object {
    let config: Partial<object> = {
        method: getAxiosRequestMethodByRequest(request),
        url: request.url,
    };
    if (request.queryParameters) {
        config = { ...config, params: request.queryParameters };
    }
    if (request.headers) {
        config = { ...config, headers: request.headers };
    }
    if (request.body) {
        config = { ...config, data: request.body };
    }
    return config;
}

export class AxiosHttpRequestDispatcher implements HttpRequestDispatcher {
    executeRequest(request: Request): Promise<RequestResponse> {
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
