export const API_TOKEN_COOKIE_NAME = 'apiToken';
export const SHOULD_REMEMBER_AUTH_COOKIE_NAME = 'shouldRememberAuth';

export enum AuthActionTypes {
    RECEIVE_CURRENT_AUTH_USER_DATA = 'RECEIVE_CURRENT_AUTH_USER_DATA-1b901980-6cd9-4799-a19b-08f05941611b',
    START_API_TOKEN_FETCH = 'START_API_TOKEN_FETCH-1b901980-6cd9-4799-a19b-08f05941611b',
    END_API_TOKEN_FETCH = 'END_API_TOKEN_FETCH-1b901980-6cd9-4799-a19b-08f05941611b',
}

type ReceiveCurrentAuthUserData = {
    type: AuthActionTypes.RECEIVE_CURRENT_AUTH_USER_DATA,
    payload: {
        apiToken: (null | string),
        userId: (null | string),
    }
};

type StartApiTokenFetch = {
    type: AuthActionTypes.START_API_TOKEN_FETCH,
};

type EndApiTokenFetch = {
    type: AuthActionTypes.END_API_TOKEN_FETCH,
};

export type AuthActions = (ReceiveCurrentAuthUserData | StartApiTokenFetch | EndApiTokenFetch);