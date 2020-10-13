import { v4 as uuidV4 } from 'uuid';
import { Request, RequestMethods } from './types';

type CreationSettings = Partial<Omit<Request, 'method'>> & Pick<Request, 'url'>;

export function createGetRequest(settings: CreationSettings): Request {
    return createHttpRequest(settings, RequestMethods.GET);
}

export function createPostRequest(settings: CreationSettings): Request {
    return createHttpRequest(settings, RequestMethods.POST);
}

export function createPutRequest(settings: CreationSettings): Request {
    return createHttpRequest(settings, RequestMethods.PUT);
}

export function createPatchRequest(settings: CreationSettings): Request {
    return createHttpRequest(settings, RequestMethods.PATCH);
}

export function createDeleteRequest(settings: CreationSettings): Request {
    return createHttpRequest(settings, RequestMethods.DELETE);
}

function createHttpRequest(settings: CreationSettings, method: RequestMethods): Request {
    return {
        id: uuidV4(),
        method,
        queryParameters: {},
        headers: {},
        body: {},
        ...settings,
    };
}
