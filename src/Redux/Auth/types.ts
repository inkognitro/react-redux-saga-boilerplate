export interface AuthState {
    currentUserId: (string | null),
}

const ACTION_SUFFIX = '1b901980-6cd9-4799-a19b-08f05941611b';

export const REFRESH_API_TOKEN = 'REFRESH_API_TOKEN' + ACTION_SUFFIX;
interface RefreshApiTokenAction {
    type: typeof REFRESH_API_TOKEN,
    payload: {
        userId: string,
    }
}

export const RECEIVE_API_TOKEN = 'RECEIVE_API_TOKEN' + ACTION_SUFFIX;
interface ReceiveApiTokenAction {
    type: typeof RECEIVE_API_TOKEN,
    payload: {
        currentUserId: string,
    }
}

export type AuthActionType = (RefreshApiTokenAction | ReceiveApiTokenAction);