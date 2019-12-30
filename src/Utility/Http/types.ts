export enum RequestMethods {
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

export type Response = {
    statusCode: number,
    body: object,
};