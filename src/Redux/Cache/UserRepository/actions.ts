import {RECEIVE_USER, User, UserRepositoryActionType} from "./types";

export function receiveUserData(user: User): UserRepositoryActionType {
    return {
        type: RECEIVE_USER,
        payload: {
            user: user
        }
    }
}