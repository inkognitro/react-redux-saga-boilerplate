import axios from "axios";
import {
    RequestResponse,
    Request,
    RequestMethods, HttpRequestDispatcher,
} from "../domain/types";

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
                header: {
                    statusCode: axiosResponse.status,
                },
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
    if (request.header) {
        config = { ...config, headers: request.header };
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
