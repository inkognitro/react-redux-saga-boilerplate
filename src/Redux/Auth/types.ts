export type AuthState = {
    currentUserId: (string | null),
}

export enum AuthActionTypes {
    REFRESH_API_TOKEN = 'REFRESH_API_TOKEN-1b901980-6cd9-4799-a19b-08f05941611b',
    RECEIVE_API_TOKEN = 'RECEIVE_API_TOKEN-1b901980-6cd9-4799-a19b-08f05941611b',
}

type RefreshApiTokenAction = {
    type: AuthActionTypes.REFRESH_API_TOKEN,
    payload: {
        userId: string,
    }
};

type ReceiveApiTokenAction = {
    type: AuthActionTypes.RECEIVE_API_TOKEN,
    payload: {
        currentUserId: string,
    }
};

export type AuthActions = (RefreshApiTokenAction | ReceiveApiTokenAction);