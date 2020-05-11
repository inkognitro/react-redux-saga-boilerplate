import {
    AuthState,
    AuthStateSelector,
} from "Common/Domain/Authentication/Types";
import { HttpRequest } from "Common/Domain/RequestHandling/Base/Http/Types";
import { findCurrentAuthUser } from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { createWithHeaderEnhancedHttpRequest } from "Common/Domain/RequestHandling/Base/Http/Command/RequestFactory";
import { put, select } from "redux-saga/effects";
import {
    createSendHttpRequest as createCommonSendHttpRequest,
} from "Common/Domain/RequestHandling/Base/Http/Command/SendHttpRequest";
import { SendHttpRequest } from "Common/Domain/RequestHandling/ApiV1/Http/Command/SendHttpRequest";

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

function getWithAuthTokenEnhancedRequest(authState: AuthState, request: HttpRequest): HttpRequest {
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
