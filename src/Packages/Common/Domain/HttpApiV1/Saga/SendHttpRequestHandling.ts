import {
    AuthState,
    AuthStateSelector,
} from "Packages/Common/Domain/Authentication/Types";
import { Request } from "Packages/Common/Domain/HttpFoundation/Types";
import { findCurrentAuthUser } from "Packages/Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { createWithHeaderEnhancedHttpRequest } from "Packages/Common/Domain/HttpFoundation/Command/RequestFactory";
import { put, select } from "redux-saga/effects";
import {
    createSendHttpRequest as createCommonSendHttpRequest,
} from "Packages/Common/Domain/HttpFoundation/Command/SendHttpRequest";
import { SendHttpRequest } from "Packages/Common/Domain/HttpApiV1/Command/SendHttpRequest";

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
