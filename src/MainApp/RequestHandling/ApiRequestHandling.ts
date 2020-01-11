import {
    createGetRequest as createGeneralGetRequest,
    createPostRequest as createGeneralPostRequest,
    executeRequest as executeGeneralRequest,
    ExecutionSummary as GeneralExecutionSummary,
    GetRequestCreationSettings,
    PostRequestCreationSettings,
    Request,
    RequestExecutionSettings as GeneralRequestExecutionSettings,
} from "Common/Utility/HttpRequestHandling";
import {findCurrentUserApiToken} from "Common/Auth/Redux/Selectors";
import {apiV1BaseUrl} from "Common/config";
import {store} from "MainApp/App";
import {addToastMessage} from "Common/Layout/Redux/Toaster/Actions";
import {ToastTypes} from "Common/Layout/Redux/Toaster/Types";

export const API_TOKEN_HEADER_NAME = 'X-API-TOKEN';

export const AUTH_REFRESH_TOKEN_ENDPOINT = apiV1BaseUrl + '/auth/refreshtoken.json';
export const AUTH_AUTHENTICATE_ENDPOINT = apiV1BaseUrl + '/auth/authenticate.json';

export function createGetRequest(settings: GetRequestCreationSettings): Request {
    const request = createGeneralGetRequest(settings);
    return createWithApiTokenHeaderEnhancedRequest(request);
}

export function createPostRequest(settings: PostRequestCreationSettings): Request {
    const request = createGeneralPostRequest(settings);
    return createWithApiTokenHeaderEnhancedRequest(request);
}

export type RequestExecutionSettings = GeneralRequestExecutionSettings;
export function executeRequest(settings: RequestExecutionSettings): void {
    const apiRequestExecutionSettings = Object.assign({}, settings, {
        onError: (summary: ExecutionSummary): void  => {
            dispatchToastErrorMessages(summary);
            if(settings.onError) {
                settings.onError(summary);
            }
        }
    });
    executeGeneralRequest(apiRequestExecutionSettings);
}

export type ExecutionSummary = GeneralExecutionSummary;

const createWithApiTokenHeaderEnhancedRequest = (request: Request): Request => {
    //@ts-ignore
    if(request.headers && request.headers[API_TOKEN_HEADER_NAME]) {
        return request;
    }
    const reduxState = store.getState();
    const apiToken = findCurrentUserApiToken(reduxState.auth, reduxState.cache.userRepository);
    if(!apiToken) {
        return request;
    }
    return createWithHeaderEnhancedRequest(request, API_TOKEN_HEADER_NAME, apiToken);
};

const createWithHeaderEnhancedRequest = (request: Request, headerProperty: string, headerValue: string): Request => {
    const currentHeaders = (request.headers ? request.headers : {});
    const newHeaders = Object.assign({}, currentHeaders, {[headerProperty]: headerValue});
    return Object.assign({}, request, {headers: newHeaders});
};

const dispatchToastErrorMessages = (summary: ExecutionSummary): void => {
    if(!summary.response) {
        //@ts-ignore
        store.dispatch(addToastMessage({
            content: 'Could not connect to server.', //todo: translate,
            type: ToastTypes.ERROR,
        }));
        return;
    }
    //todo: extend with not authorized error and so on..
};