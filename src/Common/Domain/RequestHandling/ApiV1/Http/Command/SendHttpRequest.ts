import {ApiV1CommandTypes} from "Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http";
import {Command} from "Common/Domain/Bus/Command";
import {select, takeEvery, put} from "@redux-saga/core/effects";
import {createWithHeaderEnhancedHttpRequest} from "Common/Domain/RequestHandling/Base/Http/Command/RequestFactory";
import {HttpRequest} from "Common/Domain/RequestHandling/Base/Http/Types";
import {createSendHttpRequest as createCommonSendHttpRequest} from "Common/Domain/RequestHandling/Base/Http/Command/SendHttpRequest";
import {AuthState, AuthStateSelector} from "Common/Domain/Authentication/Types";
import {findCurrentAuthUser} from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";

export function createSendHttpRequestSaga(authStateSelector: AuthStateSelector): () => Generator {
    function getWithAuthTokenEnhancedRequest(authState: AuthState, request: HttpRequest): HttpRequest {
        const authUser = findCurrentAuthUser(authState);
        if(!authUser) {
            return request;
        }
        const headerProperty = 'X-API-TOKEN';
        return createWithHeaderEnhancedHttpRequest(request, headerProperty, authUser.token);
    }

    return <GeneratorFunction>function* watchSendHttpRequest(): Generator {
        yield takeEvery(ApiV1CommandTypes.SEND_HTTP_REQUEST, function* (command: SendHttpRequest): Generator {
            //@ts-ignore
            const authState: AuthState = yield select(authStateSelector);
            const request = getWithAuthTokenEnhancedRequest(authState, command.payload.request);
            //@ts-ignore
            return yield put(createCommonSendHttpRequest(request));
        });
    }
}

export function createSendHttpRequest(request: HttpRequest): SendHttpRequest {
    return {
        type: ApiV1CommandTypes.SEND_HTTP_REQUEST,
        payload: {request},
    };
}

export type SendHttpRequest = Command<ApiV1CommandTypes.SEND_HTTP_REQUEST, {
    request: HttpRequest,
}>;