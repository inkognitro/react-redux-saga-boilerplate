import axios from 'axios';
const uuidV4 = require('uuid/v4');
import {
    RequestMethods,
    Request,
    Response,
} from "./types";

export type ExecutionSummary = {
    request: Request,
    response: null | Response,
};

export type GetRequestCreationSettings = {
    url: string,
    queryParameters?: object,
    headers?: object,
};
export function createGetRequest(settings: GetRequestCreationSettings): Request {
    return Object.assign({}, settings,{
        method: RequestMethods.GET,
        id: uuidV4(),
    });
}

export type PostRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPostRequest(settings: PostRequestCreationSettings): Request {
    return Object.assign({}, settings,{
        method: RequestMethods.POST,
        id: uuidV4(),
    });
}

export function executeRequest(request: Request): Promise<ExecutionSummary> {
    return new Promise<ExecutionSummary>((resolve, reject) => {
        axios(createAxiosConfigFromRequest(request))
            .then((response: AxiosResponse): void => {
                const summary = createSummaryFromAxiosResponse(request, response);
                resolve(summary);
            })
            .catch((error: AxiosError): void => {
                if(!error.request) {
                    console.log(error.message);
                    throw new Error('Wrong axios setup!');
                }
                const summary = createSummaryFromAxiosResponse(request, error.response);
                reject(summary);
            });
    });
}

const createAxiosConfigFromRequest = (request: Request): object => {
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
};

const getAxiosRequestMethodByRequest = (request: Request): string => {
    if(request.method === RequestMethods.GET) {
        return 'get';
    }
    if(request.method === RequestMethods.POST) {
        return 'post';
    }
    throw new Error('Method "' + request.method + '" not supported!');
};

const createSummaryFromAxiosResponse = (request: Request, axiosResponse?: AxiosResponse): ExecutionSummary => {
    return {
        request: request,
        response: (!axiosResponse ? null : {
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        })
    };
};

type AxiosError = {
    request?: object,
    response?: AxiosResponse,
    message: string,
};

type AxiosResponse = {
    status: number,
    data: object,
};