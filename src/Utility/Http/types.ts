type CommonRequestSettings = {
    url: string,
    queryParameters?: object,
    headers?: object,
};

export type GetRequestSettings = CommonRequestSettings

export type GetRequest = (GetRequestSettings & {
    method: string,
    id: string
});

export const GET_METHOD = 'GET';

export type Request = (GetRequest);

export type Response = {
    statusCode: number,
    body: object,
};