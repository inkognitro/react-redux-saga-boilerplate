import {User} from "Common/EntityCache/Domain/User/UserRepository";

export type UserRepositoryState = {
    users: User[],
};

export enum UserRepositoryActionTypes {
    RECEIVE_USER = 'RECEIVE_USER-d4c12694-0d28-4fe2-a4d3-0aa5cb365fb5',
}

type ReceiverUserAction = {
    type: UserRepositoryActionTypes.RECEIVE_USER,
    payload: {
        user: User,
    }
};

export type UserRepositoryActions = (ReceiverUserAction);