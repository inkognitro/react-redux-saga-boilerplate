import {User, UserRepositoryState} from "SinglePageApp/Cache/Redux/UserRepository/Types";
import {findUserById} from "SinglePageApp/Cache/Redux/UserRepository/Selectors";
import {findCookieContent} from "Common/Utility/CookieHandling";
import {API_TOKEN_COOKIE_NAME, AuthState} from "Common/Auth/Redux/Types";

//todo: use reselect library for performance optimization

export function findCurrentUser(state: AuthState, userRepositoryState: UserRepositoryState): (null | User) {
    const currentUserId = state.currentUserId;
    if(!currentUserId) {
        return null;
    }
    return findUserById(userRepositoryState, currentUserId);
}

export function findCurrentUserApiToken(state: AuthState, userRepositoryState: UserRepositoryState): (null | string) {
    const currentUser = findCurrentUser(state, userRepositoryState);
    if(!currentUser) {
        return null;
    }
    if(!currentUser.apiToken) {
        return null;
    }
    return currentUser.apiToken;
}

export function findCurrentUsersApiTokenFromCookie(): (null | string) {
    return findCookieContent(API_TOKEN_COOKIE_NAME);
}

export function hasCurrentUserBeenInitialized(state: AuthState): boolean {
    return state.hasCurrentUserBeenInitialized;
}