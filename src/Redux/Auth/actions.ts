import {AuthActionType, REFRESH_TOKEN} from "./types";

export function refreshToken (currentApiToken: string): AuthActionType {
    return {
        type: REFRESH_TOKEN,
        payload: {
            currentApiToken: currentApiToken
        }
    };
}