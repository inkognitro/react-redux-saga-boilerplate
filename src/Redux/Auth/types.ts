export type AuthState = {
    currentUserId: (string | null),
}

export enum AuthActionTypes {
    SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID-1b901980-6cd9-4799-a19b-08f05941611b',
}

type SetCurrentUser = {
    type: AuthActionTypes.SET_CURRENT_USER_ID,
    payload: {
        userId: string,
    }
};

export type AuthActions = (SetCurrentUser);