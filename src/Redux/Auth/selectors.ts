import {User} from "App/Redux/Cache/UserRepository/types";
import {findUserById} from "App/Redux/Cache/UserRepository/selectors";
import {RootState} from "App/Redux/root";

//todo: use reselect library for performance optimization

export function findCurrentUser(state: RootState): (null | User) {
    const currentUserId = state.auth.currentUserId;
    if(!currentUserId) {
        return null;
    }
    return findUserById(state, currentUserId);
}

export function findCurrentUserApiToken(state: RootState): (null | string) {
    const currentUser = findCurrentUser(state);
    if(!currentUser) {
        return null;
    }
    return currentUser.apiToken;
}