import {
    createGetRequest as createGeneralGetRequest,
    createPostRequest as createGeneralPostRequest,
    executeRequest as executeGeneralRequest,
    GetRequestCreationSettings,
    PostRequestCreationSettings,
    ExecutionSummary as GeneralExecutionSummary,
} from "./RequestHandling";
import {Request} from "./types";
import {findCurrentUserApiToken} from "App/Redux/Auth/selectors";
import {store} from "App/Redux/root";

export function createGetRequest(settings: GetRequestCreationSettings): Request {
    const request = createGeneralGetRequest(settings);
    return createWithApiTokenHeaderEnhancedRequest(request);
}

export function createPostRequest(settings: PostRequestCreationSettings): Request {
    const request = createGeneralPostRequest(settings);
    return createWithApiTokenHeaderEnhancedRequest(request);
}

export function executeRequest(request: Request): Promise<ExecutionSummary> {
    return new Promise<ExecutionSummary>((resolve, reject) => {
        executeGeneralRequest(request)
            .then((summary: ExecutionSummary): void => resolve(summary))
            .catch((summary: ExecutionSummary): void => {
                dispatchToastErrorMessages(summary);
                reject(summary);
            });
    });
}

export type ExecutionSummary = GeneralExecutionSummary;

const createWithApiTokenHeaderEnhancedRequest = (request: Request): Request => {
    const apiToken = findCurrentUserApiToken(store.getState());
    if(!apiToken) {
        return request;
    }
    return createWithHeaderEnhancedRequest(request, 'X-API-TOKEN', apiToken);
};

const createWithHeaderEnhancedRequest = (request: Request, headerProperty: string, headerValue: string): Request => {
    const currentHeaders = (request.headers ? request.headers : {});
    const newHeaders = Object.assign({}, currentHeaders, {[headerProperty]: headerValue});
    return Object.assign({}, request, {headers: newHeaders});
};

const dispatchToastErrorMessages = (summary: ExecutionSummary): void => {
    console.log('dispatchToastErrorMessages:');
    console.log(summary);
};