import axios from 'axios';
const uuidV4 = require('uuid/v4');
import {
    Request,
    GET_METHOD,
    GetRequest,
    CreateGetRequestSettings,
    POST_METHOD,
    PostRequest,
    CreatePostRequestSettings,
    Response,
} from "./types";

export type ExecutionSummary = {
    request: Request,
    response: null | Response,
};

export function createGetRequest(settings: CreateGetRequestSettings): GetRequest {
    return Object.assign({}, settings,{
        method: GET_METHOD,
        id: uuidV4(),
    });
}

export function createPostRequest(settings: CreatePostRequestSettings): PostRequest {
    return Object.assign({}, settings,{
        method: POST_METHOD,
        id: uuidV4(),
    });
}

export function executeRequest(request: Request): Promise<ExecutionSummary> {
    const axiosRequestHandlerFunctionName = getAxiosRequestHandlerFunctionName(request);
    return new Promise<ExecutionSummary>((resolve, reject) => {
        axios[axiosRequestHandlerFunctionName](request.url, createAxiosConfigFromRequest(request))
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

const getAxiosRequestHandlerFunctionName = (request: Request) => {
    if(request.method === GET_METHOD) {
        return 'get';
    }
    if(request.method === POST_METHOD) {
        return 'post';
    }
    throw new Error('Method "' + request.method + '" not supported');
};

const createAxiosConfigFromRequest = (request: Request): object => {
    let config = {};
    if(request.queryParameters) {
        config = Object.assign({}, config,{params: request.queryParameters});
    }
    if(request.headers) {
        config = Object.assign({}, config,{headers: request.headers});
    }
    if(request.body) {
        config = Object.assign({}, config,{data: request.body});
    }
    return config;
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