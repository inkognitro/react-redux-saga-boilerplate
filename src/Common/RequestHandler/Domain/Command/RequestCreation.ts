import {HttpRequest, HttpRequestMethods} from "Common/RequestHandler/Domain/Types";
import uuidV4 from "uuid/v4";

type GetRequestCreationSettings = {
    url: string,
    queryParameters?: object,
    headers?: object,
    isLoaderEnabled?: boolean
};

export function createGetRequest(settings: GetRequestCreationSettings): HttpRequest {
    return Object.assign({}, settings, {
        method: HttpRequestMethods.GET,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

type PostRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPostRequest(settings: PostRequestCreationSettings): HttpRequest {
    return Object.assign({}, settings, {
        method: HttpRequestMethods.POST,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

type PutRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPutRequest(settings: PutRequestCreationSettings): HttpRequest {
    return Object.assign({}, settings, {
        method: HttpRequestMethods.PUT,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

type PatchRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPatchRequest(settings: PatchRequestCreationSettings): HttpRequest {
    return Object.assign({}, settings, {
        method: HttpRequestMethods.PATCH,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

type DeleteRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createDeleteRequest(settings: DeleteRequestCreationSettings): HttpRequest {
    return Object.assign({}, settings, {
        method: HttpRequestMethods.DELETE,
        id: uuidV4(),
        isLoaderEnabled: settings.isLoaderEnabled,
    });
}

export function createWithHeaderEnhancedHttpRequest(request: HttpRequest, headerProperty: string, headerValue: string): HttpRequest {
    const currentHeaders = (request.headers ? request.headers : {});
    const newHeaders = Object.assign({}, currentHeaders, {[headerProperty]: headerValue});
    return Object.assign({}, request, {headers: newHeaders});
}