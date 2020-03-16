import {Request, RequestMethods} from "Common/RequestHandling/Domain/Types";
import uuidV4 from "uuid/v4";

type GetRequestCreationSettings = {
    url: string,
    queryParameters?: object,
    headers?: object,
    isLoaderEnabled?: boolean
};

export function createGetRequest(settings: GetRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.GET,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

type PostRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPostRequest(settings: PostRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.POST,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

type PutRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPutRequest(settings: PutRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.PUT,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

type PatchRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPatchRequest(settings: PatchRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.PATCH,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

type DeleteRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createDeleteRequest(settings: DeleteRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.DELETE,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}