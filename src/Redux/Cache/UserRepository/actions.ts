import {RECEIVE_USER, User, UserRepositoryActionType} from "./types";

export function receiveUser (user: User): UserRepositoryActionType {
    return {
        type: RECEIVE_USER,
        payload: {
            user: user
        }
    }
}