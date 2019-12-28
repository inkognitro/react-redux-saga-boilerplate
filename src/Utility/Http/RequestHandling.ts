import axios from 'axios';
const uuidV4 = require('uuid/v4');
import {Request, GetRequest, GetRequestSettings, Response, GET_METHOD} from "./types";

export type ExecutionSummary = {
    request: Request,
    response: null | Response,
};

export function createGetRequest(settings: GetRequestSettings): GetRequest {
    return Object.assign({}, settings,{
        method: GET_METHOD,
        id: uuidV4(),
    });
}

export const executeGetRequest = (request: GetRequest): Promise<ExecutionSummary> => {
    return new Promise<ExecutionSummary>((resolve, reject) => {
        axios.get(request.url, createAxiosConfigFromGetRequest(request))
            .then(function (response: AxiosResponse) {
                const summary = createSummaryFromAxiosResponse(request, response);
                resolve(summary);
            })
            .catch(function (error: AxiosError) {
                if(!error.request) {
                    console.log(error.message);
                    throw new Error('Wrong axios setup!');
                }
                const summary = createSummaryFromAxiosResponse(request, error.response);
                reject(summary);
            })
    });
};

const createAxiosConfigFromGetRequest = (request: GetRequest): object => {
    let config = {};
    if(request.queryParameters) {
        config = Object.assign({}, config,{params: request.queryParameters});
    }
    if(request.headers) {
        config = Object.assign({}, config,{headers: request.headers});
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