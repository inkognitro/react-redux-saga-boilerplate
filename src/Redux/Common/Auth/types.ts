import {User} from "App/Model/User";

export interface AuthState {
    apiToken: string | null,
    user: User | null,
}

const ACTION_SUFFIX = '1b901980-6cd9-4799-a19b-08f05941611b';

export const REFRESH_TOKEN = 'REFRESH_TOKEN' + ACTION_SUFFIX;
interface RefreshTokenAction {
    type: typeof REFRESH_TOKEN,
    payload: {
        currentApiToken: string,
    }
}

export type AuthActionType = (RefreshTokenAction);