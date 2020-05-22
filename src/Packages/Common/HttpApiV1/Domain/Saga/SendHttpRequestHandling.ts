import {
    AuthState,
    AuthStateSelector,
} from "Packages/Common/Authentication/Domain/Types";
import { Request } from "Packages/Common/HttpFoundation/Domain/Types";
import { findCurrentAuthUser } from "Packages/Common/Authentication/Domain/Query/CurrentAuthUserQuery";
import { createWithHeaderEnhancedHttpRequest } from "Packages/Common/HttpFoundation/Domain/Command/RequestFactory";
import { put, select } from "redux-saga/effects";
import {
    createSendHttpRequest as createCommonSendHttpRequest,
} from "Packages/Common/HttpFoundation/Domain/Command/SendHttpRequest";
import { SendHttpRequest } from "Packages/Common/HttpApiV1/Domain/Command/SendHttpRequest";

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
    return createWithHeaderEnhancedHttpRequest(
        request,
        headerProperty,
        authUser.token,
    );
}
