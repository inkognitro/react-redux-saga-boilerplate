import {
    put, select, spawn, takeEvery,
} from "redux-saga/effects";
import { AuthState, AuthStateSelector, getCurrentAuthUser } from "packages/common/authentication/domain";
import { executeRequest, RequestResponse } from "packages/common/http-foundation/domain";
import { AuthUserTypes } from "packages/common/types/auth-user/domain";
import { ApiV1CommandTypes, SendApiV1Request } from "../command";
import {
    ApiV1Request, ApiV1RequestTypes, HttpApiV1State, HttpApiV1StateSelector,
} from "../types";
import { createResponseCouldNotBeReceived, createResponseWasReceived } from "../event";
import { createFoundationRequestFromApiV1Request } from "../request.factory";
import { getBaseUrl } from "../query";

function findAuthToken(authState: AuthState): (undefined | string) {
    const currentUser = getCurrentAuthUser(authState);
    if (currentUser.type === AuthUserTypes.AUTHENTICATED_USER) {
        return currentUser.token;
    }
    return undefined;
}

function* executeApiV1Request(
    httpApiV1StateSelector: HttpApiV1StateSelector,
    authStateSelector: AuthStateSelector,
    request: ApiV1Request,
): Generator {
    // @ts-ignore
    const apiV1State: HttpApiV1State = yield select(httpApiV1StateSelector);
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const foundationRequest = createFoundationRequestFromApiV1Request({
        baseUrl: getBaseUrl(apiV1State),
        request,
        token: findAuthToken(authState),
    });
    // @ts-ignore
    const requestResponse: RequestResponse = yield executeRequest(foundationRequest);
    if (!requestResponse.response) {
        yield put(createResponseCouldNotBeReceived(request));
    }
    yield put(createResponseWasReceived(request, requestResponse.response));
}

function* handleSendApiV1Request(
    httpApiV1StateSelector: HttpApiV1StateSelector,
    authStateSelector: AuthStateSelector,
    command: SendApiV1Request,
): Generator {
    if (command.payload.request.type === ApiV1RequestTypes.SINGLE_REQUEST) {
        yield executeApiV1Request(httpApiV1StateSelector, authStateSelector, command.payload.request);
        return;
    }
    throw new Error(`Request with type "${command.payload.request.type}" not supported!`);
}

function* watchSendApiV1RequestCommands(
    httpApiV1StateSelector: HttpApiV1StateSelector,
    authStateSelector: AuthStateSelector,
): Generator {
    yield takeEvery(
        ApiV1CommandTypes.SEND_API_V1_REQUEST,
        handleSendApiV1Request,
        httpApiV1StateSelector,
        authStateSelector,
    );
}

export function createHttpApiV1Saga(
    httpApiV1StateSelector: HttpApiV1StateSelector,
    authStateSelector: AuthStateSelector,
): () => Generator {
    return function* (): Generator {
        yield spawn(watchSendApiV1RequestCommands, httpApiV1StateSelector, authStateSelector);
    };
}
