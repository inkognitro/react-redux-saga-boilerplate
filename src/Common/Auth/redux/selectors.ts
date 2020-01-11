import {User} from "Common/Cache/redux/UserRepository/types";
import {findUserById} from "Common/Cache/redux/UserRepository/selectors";
import {findCookieContent} from "Common/Utility/CookieHandling";
import {API_TOKEN_COOKIE_NAME} from "Common/Auth/redux/types";
import {RootState} from "MainApp/App";

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