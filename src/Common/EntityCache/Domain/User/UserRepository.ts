import {AppDispatch} from "Common/types";
import {UserRepositoryState} from "Common/EntityCache/Domain/User/Types";
import {createReceiveUserDataAction} from "Common/EntityCache/Domain/User/Actions";
import {findUserById} from "Common/EntityCache/Domain/User/Selectors";

export type User = {
    id: string,
    username?: string,
};

export interface UserRepositoryInterface {
    saveUserData(userData: User): void
    findById(userId: string): (null | User)
}

type UserRepositoryStateSelector = () => UserRepositoryState;

export class UserRepository implements UserRepositoryInterface {
    private readonly dispatch: AppDispatch;
    private readonly getUserRepositoryState: UserRepositoryStateSelector;

    constructor(dispatch: AppDispatch, getUserRepositoryState: UserRepositoryStateSelector) {
        this.dispatch = dispatch;
        this.getUserRepositoryState = getUserRepositoryState;
    }

    saveUserData(userData: User): void {
        const action = createReceiveUserDataAction(userData);
        this.dispatch(action);
    }

    findById(userId: string): (null | User) {
        return findUserById(this.getUserRepositoryState(), userId);
    }
}