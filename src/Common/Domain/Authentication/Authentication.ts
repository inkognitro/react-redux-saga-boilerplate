import {spawn} from "@redux-saga/core/effects";
import {AuthStateSelector} from "Common/Domain/Authentication/Types";
import {createAuthenticationFlow} from "Common/Domain/Authentication/Saga/Flow/AuthenticationFlow";

export enum AuthCommandTypes {
    INITIALIZE_CURRENT_USER = 'INITIALIZE_CURRENT_USER-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    REFRESH_AUTHENTICATION = 'REFRESH_AUTHENTICATION-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    LOGIN = 'LOGIN-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    LOGOUT = 'LOGOUT-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
}

export function createAuthenticationSaga(authStateSelector: AuthStateSelector): () => Generator {
    return function* authenticationSaga() {
        yield spawn(createAuthenticationFlow(authStateSelector));
    }
}