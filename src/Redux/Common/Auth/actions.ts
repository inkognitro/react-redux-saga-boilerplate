import {AuthActionType, REFRESH_TOKEN} from "App/Redux/Common/Auth/types";

export function refreshToken (currentApiToken: string): AuthActionType {
    return {
        type: REFRESH_TOKEN,
        payload: {
            currentApiToken: currentApiToken
        }
    };
}