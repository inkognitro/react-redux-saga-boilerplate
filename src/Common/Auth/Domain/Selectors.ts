import {CookieWriter} from "Common/Cookie/Domain/CookieWriter";
import {API_TOKEN_COOKIE_NAME, AuthState, SHOULD_REMEMBER_AUTH_COOKIE_NAME} from "Common/Auth/Domain/Types";
import {UserRepository} from "Common/EntityCache/Domain/User/UserRepository";
import {User} from "Common/EntityCache/Domain/User/Types";

//todo: use reselect library for performance optimization

export function findCurrentUser(state: AuthState, userRepository: UserRepository): (null | User) {
    const currentUserId = state.currentUserId;
    if (!currentUserId) {
        return null;
    }
    return userRepository.findById(currentUserId);
}

export function isApiTokenBeingFetchedRightNow(state: AuthState): boolean {
    return state.isFetchingApiToken;
}

export function findApiToken(state: AuthState): (null | string) {
    return state.apiToken;
}

export function findApiTokenFromCookie(cookieStorage: CookieWriter): (null | string) {
    return cookieStorage.findCookieContent(API_TOKEN_COOKIE_NAME);
}

export function shouldRememberCurrentUser(cookieStorage: CookieWriter): boolean {
    const cookieContent = cookieStorage.findCookieContent(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
    return !!cookieContent;
}