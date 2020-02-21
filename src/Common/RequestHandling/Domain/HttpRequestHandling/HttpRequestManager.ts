import {
    RequestHandlingActions,
    RequestHandlingActionTypes, RequestHandlingState
} from "Common/RequestHandling/Domain/HttpRequestHandling/Types";
import {AppDispatch, AppThunk} from "Common/types";
import uuidV4 from "uuid/v4";
import {isRequestRunningWithEnabledLoader} from "Common/RequestHandling/Domain/HttpRequestHandling/Selectors";

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type Response = {
    statusCode: number,
    body: object,
};

export type ExecutionSummary = {
    request: Request,
    response: null | Response,
};

export type Request = {
    method: RequestMethods,
    id: string,
    url: string,
    queryParameters?: object,
    headers?: object,
    body?: object,
    isLoaderEnabled?: boolean,
};

export type RequestExecutionSettings = {
    request: Request,
    onSuccess?(summary: ExecutionSummary): void,
    onError?(summary: ExecutionSummary): void,
};

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

export function createWithHeaderEnhancedHttpRequest(request: Request, headerProperty: string, headerValue: string): Request {
    const currentHeaders = (request.headers ? request.headers : {});
    const newHeaders = Object.assign({}, currentHeaders, {[headerProperty]: headerValue});
    return Object.assign({}, request, {headers: newHeaders});
}

export interface HttpRequestDispatcherInterface {
    executeRequest(settings: RequestExecutionSettings): void
}

export interface HttpRequestManagerInterface {
    executeRequest(settings: RequestExecutionSettings): void
    hasRunningRequestsWithEnabledLoader(): boolean
}

export type RequestHandlingStateSelector = () => RequestHandlingState;

export class HttpRequestManager implements HttpRequestManagerInterface {
    private readonly getRequestHandlingState: RequestHandlingStateSelector;
    private readonly dispatch: AppDispatch;
    private readonly requestDispatcher: HttpRequestDispatcherInterface;

    constructor(
        getRequestHandlingState: RequestHandlingStateSelector,
        dispatch: AppDispatch,
        requestDispatcher: HttpRequestDispatcherInterface
    ) {
        this.getRequestHandlingState = getRequestHandlingState;
        this.dispatch = dispatch;
        this.requestDispatcher = requestDispatcher;
    }

    hasRunningRequestsWithEnabledLoader(): boolean {
        return isRequestRunningWithEnabledLoader(this.getRequestHandlingState());
    }

    executeRequest(settings: RequestExecutionSettings): void {
        this.dispatch(createDispatchRequestThunk(settings, this.requestDispatcher));
    }
}

function createDispatchRequestThunk(settings: RequestExecutionSettings, requestDispatcher: HttpRequestDispatcherInterface): AppThunk {
    return function(dispatch: AppDispatch) {
        const extendedSettings = Object.assign({}, settings, {
            onSuccess: (executionSummary: ExecutionSummary) => {
                dispatch(createCloseRequestAction(settings.request.id));
                if(settings.onSuccess) {
                    settings.onSuccess(executionSummary);
                }
            },
            onError: (executionSummary: ExecutionSummary) => {
                dispatch(createCloseRequestAction(settings.request.id));
                if(settings.onError) {
                    settings.onError(executionSummary);
                }
            },
        });
        dispatch(createSendRequestAction(extendedSettings.request));
        requestDispatcher.executeRequest(extendedSettings);
    };
}

function createSendRequestAction(request: Request): RequestHandlingActions {
    return {
        type: RequestHandlingActionTypes.SEND_REQUEST,
        payload: {
            request: request,
        }
    };
}

function createCloseRequestAction(requestId: string): RequestHandlingActions {
    return {
        type: RequestHandlingActionTypes.CLOSE_REQUEST,
        payload: {
            requestId: requestId,
        }
    };
}