import {createGetRequest as createGeneralGetRequest, ExecutionSummary} from "./RequestHandling";
import {CreateGetRequestSettings, GetRequest, Request} from "./types";
import {findCurrentUserApiToken} from "App/Redux/Auth/selectors";
import {store} from "App/Redux/root";

export function createGetRequest(settings: CreateGetRequestSettings): GetRequest {
    const request = createGeneralGetRequest(settings);
    return createWithApiTokenHeaderEnhancedRequest(request);
}

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

export function executeRequest(request: Request): Promise<ExecutionSummary> {
    //todo: dispatch toasts!
}