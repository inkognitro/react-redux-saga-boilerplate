import {
    Request,
    RequestMethods,
} from "Packages/Common/Domain/HttpFoundation/Types";
import uuidV4 from "uuid/v4";

type GetRequestCreationSettings = {
  id?: string;
  url: string;
  queryParameters?: object;
  headers?: object;
};

export function createGetRequest(
    settings: GetRequestCreationSettings,
): Request {
    return createHttpRequest(settings, RequestMethods.GET);
}

type PostRequestCreationSettings = GetRequestCreationSettings & {
  body?: object;
};
export function createPostRequest(
    settings: PostRequestCreationSettings,
): Request {
    return createHttpRequest(settings, RequestMethods.POST);
}

type PutRequestCreationSettings = GetRequestCreationSettings & {
  body?: object;
};
export function createPutRequest(
    settings: PutRequestCreationSettings,
): Request {
    return createHttpRequest(settings, RequestMethods.PUT);
}

type PatchRequestCreationSettings = GetRequestCreationSettings & {
  body?: object;
};
export function createPatchRequest(
    settings: PatchRequestCreationSettings,
): Request {
    return createHttpRequest(settings, RequestMethods.PATCH);
}

type DeleteRequestCreationSettings = GetRequestCreationSettings & {
  body?: object;
};
export function createDeleteRequest(
    settings: DeleteRequestCreationSettings,
): Request {
    return createHttpRequest(settings, RequestMethods.DELETE);
}

export function createWithHeaderEnhancedHttpRequest(
    request: Request,
    headerProperty: string,
    headerValue: string,
): Request {
    return {
        ...request,
        headers: {
            ...request.headers,
            [headerProperty]: headerValue,
        },
    };
}

function createHttpRequest(
    settings: GetRequestCreationSettings & { body?: object },
    method: RequestMethods,
): Request {
    return {
        id: settings.id ? settings.id : uuidV4(),
        method,
        url: settings.url,
        queryParameters: settings.queryParameters ? settings.queryParameters : {},
        headers: settings.headers ? settings.headers : {},
        body: settings.body ? settings.body : undefined,
    };
}
