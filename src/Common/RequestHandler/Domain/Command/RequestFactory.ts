import {HttpRequest, HttpRequestMethods} from "Common/RequestHandler/Domain/Types";
import uuidV4 from "uuid/v4";

type GetRequestCreationSettings = {
    url: string,
    queryParameters?: object,
    headers?: object,
    isLoaderEnabled?: boolean
};

export function createGetRequest(settings: GetRequestCreationSettings): HttpRequest {
    return createHttpRequest(settings, HttpRequestMethods.GET);
}

type PostRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPostRequest(settings: PostRequestCreationSettings): HttpRequest {
    return createHttpRequest(settings, HttpRequestMethods.POST);
}

type PutRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPutRequest(settings: PutRequestCreationSettings): HttpRequest {
    return createHttpRequest(settings, HttpRequestMethods.PUT);
}

type PatchRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createPatchRequest(settings: PatchRequestCreationSettings): HttpRequest {
    return createHttpRequest(settings, HttpRequestMethods.PATCH);
}

type DeleteRequestCreationSettings = (GetRequestCreationSettings & { body?: object });
export function createDeleteRequest(settings: DeleteRequestCreationSettings): HttpRequest {
    return createHttpRequest(settings, HttpRequestMethods.DELETE);
}

export function createWithHeaderEnhancedHttpRequest(request: HttpRequest, headerProperty: string, headerValue: string): HttpRequest {
    return {
        ...request,
        headers: {
            ...request.headers,
            [headerProperty]: headerValue
        },
    };
}

function createHttpRequest(settings: (GetRequestCreationSettings & {body?: object}), method: HttpRequestMethods): HttpRequest {
    return {
        id: uuidV4(),
        method: method,
        url: settings.url,
        queryParameters: (settings.queryParameters ? settings.queryParameters : {}),
        headers: (settings.headers ? settings.headers : {}),
        isLoaderEnabled: (settings.isLoaderEnabled ? settings.isLoaderEnabled : false),
        body: (settings.body ? settings.body : undefined),
    };
}