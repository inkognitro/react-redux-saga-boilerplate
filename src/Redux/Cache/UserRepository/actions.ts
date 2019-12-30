import {User, UserRepositoryActions, UserRepositoryActionTypes} from "./types";

export function receiveUser(user: User): UserRepositoryActions {
    return {
        type: UserRepositoryActionTypes.RECEIVE_USER,
        payload: {
            user: user
        }
    }
}