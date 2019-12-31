import {User} from "App/Redux/Cache/UserRepository/types";
import {findUserById} from "App/Redux/Cache/UserRepository/selectors";
import {RootState} from "App/Redux/root";
import {findCookieContent} from "App/Utility/CookieHandling";
import {API_TOKEN_COOKIE_NAME} from "App/Redux/Auth/types";

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
    if(!currentUser.apiToken) {
        return null;
    }
    return currentUser.apiToken;
}

export function findCurrentUsersApiTokenFromCookie(): (null | string) {
    return findCookieContent(API_TOKEN_COOKIE_NAME);
}

export function hasCurrentUserBeenInitialized(state: RootState): boolean {
    return state.auth.hasCurrentUserBeenInitialized;
}