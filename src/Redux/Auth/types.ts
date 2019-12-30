export const API_TOKEN_COOKIE_NAME = 'apiToken';

export type AuthState = {
    currentUserHasBeenInitialized: boolean,
    currentUserId: (string | null),
}

export enum AuthActionTypes {
    SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID-1b901980-6cd9-4799-a19b-08f05941611b',
}

type SetCurrentUser = {
    type: AuthActionTypes.SET_CURRENT_USER_ID,
    payload: {
        userId: (null | string),
    }
};

export type AuthActions = (SetCurrentUser);