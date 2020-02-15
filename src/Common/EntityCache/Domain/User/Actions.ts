import {UserRepositoryActions, UserRepositoryActionTypes} from "./Types";
import {User} from "Common/EntityCache/Domain/User/UserRepository";

export function createReceiveUserDataAction(user: User): UserRepositoryActions {
    return {
        type: UserRepositoryActionTypes.RECEIVE_USER,
        payload: {
            user: user
        }
    }
}