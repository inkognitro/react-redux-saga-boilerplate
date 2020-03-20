import {Event} from 'Common/AppBase/EventBus';
import {User, UserRepositoryEventTypes} from "../Types";

export function createUserWasUpdated(user: User): UserWasUpdated {
    return {
        type: UserRepositoryEventTypes.USER_WAS_UPDATED,
        payload: {
            user: user
        }
    };
}

export type UserWasUpdated = Event<UserRepositoryEventTypes.USER_WAS_UPDATED, {
    user: User,
}>;