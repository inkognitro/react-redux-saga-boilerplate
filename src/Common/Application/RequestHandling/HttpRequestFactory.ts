import {Request, RequestMethods} from "Common/Application/RequestHandling/Redux/Types";
import {v4 as uuidV4} from "uuid";

export type GetRequestCreationSettings = {
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

export type PostRequestCreationSettings = (GetRequestCreationSettings & { body?: object });

export function createPostRequest(settings: PostRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.POST,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

export type PutRequestCreationSettings = (GetRequestCreationSettings & { body?: object });

export function createPutRequest(settings: PutRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.PUT,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

export type PatchRequestCreationSettings = (GetRequestCreationSettings & { body?: object });

export function createPatchRequest(settings: PatchRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.PATCH,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

export type DeleteRequestCreationSettings = (GetRequestCreationSettings & { body?: object });

export function createDeleteRequest(settings: DeleteRequestCreationSettings): Request {
    return Object.assign({}, settings, {
        method: RequestMethods.DELETE,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

export function createWithHeaderEnhancedRequest(request: Request, headerProperty: string, headerValue: string): Request {
    const currentHeaders = (request.headers ? request.headers : {});
    const newHeaders = Object.assign({}, currentHeaders, {[headerProperty]: headerValue});
    return Object.assign({}, request, {headers: newHeaders});
}