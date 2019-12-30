export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
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