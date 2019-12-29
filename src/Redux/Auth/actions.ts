import {AuthActionType, REFRESH_API_TOKEN} from "./types";

export function refreshApiToken (userId: string): AuthActionType {
    return {
        type: REFRESH_API_TOKEN,
        payload: {
            userId: userId
        }
    };
}