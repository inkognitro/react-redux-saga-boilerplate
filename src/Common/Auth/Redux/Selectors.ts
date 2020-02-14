import {User, UserRepositoryState} from "Common/EntityCache/Redux/UserRepository/Types";
import {findUserById} from "Common/EntityCache/Redux/UserRepository/Selectors";
import {findCookieContent} from "Common/CookieHandling";
import {API_TOKEN_COOKIE_NAME, AuthState, SHOULD_REMEMBER_AUTH_COOKIE_NAME} from "Common/Auth/Redux/Types";

//todo: use reselect library for performance optimization

export function findCurrentUser(state: AuthState, userRepositoryState: UserRepositoryState): (null | User) {
    const currentUserId = state.currentUserId;
    if (!currentUserId) {
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

export function shouldRememberAuthByCookie(): boolean {
    const cookieContent = findCookieContent(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
    return !!cookieContent;
}