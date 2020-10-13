export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum HttpStatusCodes {
    OK = 200,
    CREATED = 201,
    NOT_FOUND = 404,
}

export type Response<B extends object = {}> = {
    headers: { statusCode: number };
    body: B;
};

export type Request<Q extends object = {}, B extends object = {}, H extends object = {}> = {
    id: string;
    method: RequestMethods;
    url: string;
    headers: H;
    queryParameters: Q;
    body: B;
};

export type RequestResponse<R extends Response = any> = {
    request: Request;
    response: R | undefined;
};

export type HttpFoundationState = {
    runningRequests: Request[];
};

export type HttpFoundationStateSelector<State = any> = (state: State) => HttpFoundationState;

export interface HttpRequestDispatcher {
    executeRequest(request: Request): Promise<RequestResponse>;
}
