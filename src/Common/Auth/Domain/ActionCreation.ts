import {AuthActions, AuthActionTypes} from "Common/Auth/Domain/Types";

export function createReceiveCurrentAuthUserDataAction(apiToken: (null | string), userId: (null | string)): AuthActions {
    return {
        type: AuthActionTypes.RECEIVE_CURRENT_AUTH_USER_DATA,
        payload: {
            apiToken: apiToken,
            userId: userId
        }
    };
}

export function createStartApiTokenFetchAction(): AuthActions {
    return {type: AuthActionTypes.START_API_TOKEN_FETCH};
}

export function createEndApiTokenFetchAction(): AuthActions {
    return {type: AuthActionTypes.END_API_TOKEN_FETCH};
}