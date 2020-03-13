import {CookieStorage} from "Common/Cookie/Domain/CookieStorage";
import {API_TOKEN_COOKIE_NAME, AuthState, SHOULD_REMEMBER_AUTH_COOKIE_NAME} from "Common/Auth/Domain/Types";
import {User, UserRepositoryInterface} from "Common/EntityCache/Domain/User/UserRepository";

//todo: use reselect library for performance optimization

export function findCurrentUser(state: AuthState, userRepository: UserRepositoryInterface): (null | User) {
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

export function findApiTokenFromCookie(cookieStorage: CookieStorage): (null | string) {
    return cookieStorage.findCookieContent(API_TOKEN_COOKIE_NAME);
}

export function shouldRememberCurrentUser(cookieStorage: CookieStorage): boolean {
    const cookieContent = cookieStorage.findCookieContent(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
    return !!cookieContent;
}