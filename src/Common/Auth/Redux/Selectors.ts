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

export function findApiToken(state: AuthState): (null | string) {
    return state.apiToken;
}

export function findApiTokenFromCookie(): (null | string) {
    return findCookieContent(API_TOKEN_COOKIE_NAME);
}

export function isFetchingApiToken(state: AuthState): boolean {
    return state.isFetchingApiToken;
}