import {
    Request,
    getWithHeaderEnhancedHttpRequest,
    createSendHttpRequest as createCommonSendHttpRequest,
} from "Packages/Common/HttpFoundation";
import {
    findCurrentAuthUser,
    AuthState,
    AuthStateSelector,
} from "Packages/Common/Authentication";
import { put, select } from "redux-saga/effects";
import { SendHttpRequest } from "Packages/Common/HttpApiV1";

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
    const authUser = findCurrentAuthUser(authState);
    if (!authUser) {
        return request;
    }
    const headerProperty = "X-API-TOKEN";
    return getWithHeaderEnhancedHttpRequest(
        request,
        headerProperty,
        authUser.token,
    );
}
