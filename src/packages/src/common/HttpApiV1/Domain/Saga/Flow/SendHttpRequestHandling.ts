import { put, select } from "redux-saga/effects";
import {
    createSendHttpRequest as createCommonSendHttpRequest,
    getWithHeaderEnhancedHttpRequest,
    Request,
} from "packages/common/http-foundation/domain";
import { AuthUserTypes } from "packages/entity/auth-user/domain";
import { AuthState, AuthStateSelector, getCurrentAuthUser } from "packages/common/Authentication/Domain";
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
