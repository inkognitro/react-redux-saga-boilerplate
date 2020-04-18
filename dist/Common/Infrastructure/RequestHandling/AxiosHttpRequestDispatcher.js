"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
class AxiosHttpRequestDispatcher {
    executeRequest(request) {
        return new Promise((resolve) => {
            axios_1.default(createAxiosConfigFromExecutionSettings(request))
                .then((response) => {
                const requestResponse = createRequestResponseFromAxiosResponse(request, response);
                resolve(requestResponse);
            })
                .catch((error) => {
                if (!error.request) {
                    console.error('Wrong axios configuration!', error);
                }
                const requestResponse = createRequestResponseFromAxiosResponse(request, error.response);
                resolve(requestResponse);
            });
        });
    }
}
exports.AxiosHttpRequestDispatcher = AxiosHttpRequestDispatcher;
function createAxiosConfigFromExecutionSettings(request) {
    let config = {
        method: getAxiosRequestMethodByRequest(request),
        url: request.url,
    };
    if (request.queryParameters) {
        config = Object.assign({}, config, { params: request.queryParameters });
    }
    if (request.headers) {
        config = Object.assign({}, config, { headers: request.headers });
    }
    if (request.hasOwnProperty('body')) {
        config = Object.assign({}, config, { data: request.body });
    }
    return config;
}
function getAxiosRequestMethodByRequest(request) {
    if (request.method === Types_1.HttpRequestMethods.GET) {
        return 'get';
    }
    if (request.method === Types_1.HttpRequestMethods.POST) {
        return 'post';
    }
    throw new Error('Method "' + request.method + '" not supported!');
}
function createRequestResponseFromAxiosResponse(request, axiosResponse) {
    return {
        request: request,
        response: (!axiosResponse ? undefined : {
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        })
    };
}
//# sourceMappingURL=AxiosHttpRequestDispatcher.js.map