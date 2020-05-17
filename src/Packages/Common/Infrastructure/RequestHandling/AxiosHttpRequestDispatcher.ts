import axios from "axios";
import {
    RequestResponse,
    Request,
    RequestMethods,
} from "Packages/Common/Domain/HttpFoundation/Types";
import { HttpRequestDispatcher } from "Packages/Common/Domain/HttpFoundation/HttpRequestDispatcher";

function getAxiosRequestMethodByRequest(request: Request): string {
    if (request.method === RequestMethods.GET) {
        return "get";
    }
    if (request.method === RequestMethods.POST) {
        return "post";
    }
    throw new Error(`Method "${request.method}" not supported!`);
}

function createRequestResponseFromAxiosResponse(
    request: Request,
    axiosResponse?: AxiosResponse,
): RequestResponse {
    return {
        request,
        response: !axiosResponse
            ? undefined
            : {
                statusCode: axiosResponse.status,
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
                    const requestResponse = createRequestResponseFromAxiosResponse(
                        request,
                        response,
                    );
                    resolve(requestResponse);
                })
                .catch((error: AxiosError): void => {
                    if (!error.request) {
                        console.error("Wrong axios configuration!", error);
                    }
                    const requestResponse = createRequestResponseFromAxiosResponse(
                        request,
                        error.response,
                    );
                    resolve(requestResponse);
                });
        });
    }
}

type AxiosError = {
  request?: object;
  response?: AxiosResponse;
  message: string;
};

type AxiosResponse = {
  status: number;
  data: object;
};
