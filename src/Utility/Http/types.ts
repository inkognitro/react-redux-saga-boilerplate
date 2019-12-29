type CommonCreateRequestSettings = {
    url: string,
    queryParameters?: object,
    headers?: object,
};

type CommonRequestSettings = {
    method: string,
    id: string
};

export const GET_METHOD = 'GET';
export type CreateGetRequestSettings = CommonCreateRequestSettings;
export type GetRequest = (CommonRequestSettings & CreateGetRequestSettings);

export const POST_METHOD = 'POST';
export type CreatePostRequestSettings = (CommonCreateRequestSettings & { body?: object });
export type PostRequest = (CommonRequestSettings & CreatePostRequestSettings);

export type Request = (PostRequest | GetRequest);

export type Response = {
    statusCode: number,
    body: object,
};