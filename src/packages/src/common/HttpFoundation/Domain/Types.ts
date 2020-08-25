export enum RequestMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export enum HttpStatusCodes {
    OK = 200,
}

export type Response<ResponseBody = {}> = {
    header: {
        statusCode: number
    }
    body: ResponseBody
};

export type Request = {
    method: RequestMethods
    id: string
    url: string
    queryParameters: object
    header: object
    body: undefined | object
};

export type RequestResponse<ResponseBody = {}> = {
    request: Request
    response?: Response<ResponseBody>
};

export type HttpFoundationState = {
    runningHttpRequests: Request[]
};

export type HttpFoundationStateSelector<State = any> = (state: State) => HttpFoundationState;

export interface HttpRequestDispatcher {
    executeRequest(request: Request): Promise<RequestResponse>;
}
