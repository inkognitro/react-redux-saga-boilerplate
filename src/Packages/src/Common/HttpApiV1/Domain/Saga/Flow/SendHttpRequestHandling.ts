import { put, select } from "redux-saga/effects";
import {
    createSendHttpRequest as createCommonSendHttpRequest,
    getWithHeaderEnhancedHttpRequest,
    Request,
} from "Packages/Common/HttpFoundation/Domain";
import { AuthUserTypes } from "Packages/Entity/AuthUser/Domain";
import { AuthState, AuthStateSelector, getCurrentAuthUser } from "Packages/Common/Authentication/Domain";
import { SendHttpRequest } from "../../Command/SendHttpRequest";

export function* handleSendHttpRequest(authStateSelector: AuthStateSelector, command: SendHttpRequest): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const request = getWithAuthTokenEnhancedRequest(
        authState,
        command.payload.request,
    );
    // @ts-ignore
    return yield put(createCommonSendHttpRequest(request));
}

function getWithAuthTokenEnhancedRequest(authState: AuthState, request: Request): Request {
    const authUser = getCurrentAuthUser(authState);
    if (authUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
        return request;
    }
    const headerProperty = "X-API-TOKEN";
    return getWithHeaderEnhancedHttpRequest(
        request,
        headerProperty,
        authUser.token,
    );
}
