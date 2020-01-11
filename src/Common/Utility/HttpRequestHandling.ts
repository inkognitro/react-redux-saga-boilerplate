import axios from 'axios';
import {v4 as uuidV4} from 'uuid';

enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type Request = {
    method: RequestMethods,
    id: string,
    url: string,
    queryParameters?: object,
    headers?: object,
    body?: object,
};

type Response = {
    statusCode: number,
    body: object,
};

export type ExecutionSummary = {
    request: Request,
    response: null | Response,
};

export function getResponseBodyJson(summary: ExecutionSummary): object {
    if(!summary.response || !summary.response.body) {
        return {};
    }
    return summary.response.body;
}

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

export type PutRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPutRequest(settings: PutRequestCreationSettings): Request {
    return Object.assign({}, settings,{
        method: RequestMethods.PUT,
        id: uuidV4(),
    });
}

export type PatchRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPatchRequest(settings: PatchRequestCreationSettings): Request {
    return Object.assign({}, settings,{
        method: RequestMethods.PATCH,
        id: uuidV4(),
    });
}

export type DeleteRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createDeleteRequest(settings: DeleteRequestCreationSettings): Request {
    return Object.assign({}, settings,{
        method: RequestMethods.DELETE,
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