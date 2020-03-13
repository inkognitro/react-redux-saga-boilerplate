import {AppDispatch, AppThunk} from "Common/types";
import {API_TOKEN_COOKIE_NAME, AuthState, SHOULD_REMEMBER_AUTH_COOKIE_NAME} from "Common/Auth/Domain/Types";
import {User, UserRepositoryInterface} from "Common/EntityCache/Domain/User/UserRepository";
import {CookieStorageInterface} from "Common/Cookie/Domain/CookieStorage";
import {AuthBackendService, AuthData} from "Common/Auth/Domain/AuthBackendService";
import {
    findApiToken,
    findApiTokenFromCookie, findCurrentUser,
    isApiTokenBeingFetchedRightNow,
    shouldRememberCurrentUser
} from "Common/Auth/Domain/Selectors";
import {apiTokenCookieTimeToLiveInDays, triggerApiTokenRefreshBeforeExpirationInSeconds} from "Common/config";
import {getSecondsUntilExpiration} from "Common/Auth/Domain/JWTHandling";
import {
    createEndApiTokenFetchAction,
    createReceiveCurrentAuthUserDataAction,
    createStartApiTokenFetchAction
} from "Common/Auth/Domain/ActionCreation";

export interface AuthManagerInterface {
    initializeCurrentUser(): void
    logoutCurrentUser(): void
    authenticate(settings: AuthenticateSettings): void
    findCurrentUser(): (null | User)
}

type AuthStateSelector = () => AuthState;

type AuthenticateSettings = {
    username: string,
    password: string,
    shouldRemember: boolean,
    onSuccess?(): void,
    onError?(): void,
    isLoaderEnabled: boolean,
};

type RefreshTokenSettings = {
    apiToken: string,
    onSuccess?(): void,
    onError?(): void,
    isLoaderEnabled: boolean,
};

type CurrentUserSettings = {
    authData: AuthData,
    shouldRemember?: boolean,
};

export class AuthManager implements AuthManagerInterface {
    private readonly dispatch: AppDispatch;
    private readonly getAuthState: AuthStateSelector;
    private readonly userRepository: UserRepositoryInterface;
    private readonly cookieStorage: CookieStorageInterface;
    private readonly authBackendService: AuthBackendService;

    constructor(
        dispatch: AppDispatch,
        getAuthState: AuthStateSelector,
        userRepository: UserRepositoryInterface,
        cookieStorage: CookieStorageInterface,
        authBackendService: AuthBackendService
    ) {
        this.dispatch = dispatch;
        this.getAuthState = getAuthState;
        this.userRepository = userRepository;
        this.cookieStorage = cookieStorage;
        this.authBackendService = authBackendService;
    }

    public findCurrentUser(): User | null {
        return findCurrentUser(this.getAuthState(), this.userRepository);
    }

    public initializeCurrentUser(): void {
        this.dispatch(this.createInitializeCurrentUserThunk());
    }

    public authenticate(settings: AuthenticateSettings): void {
        this.dispatch(this.createAuthenticateThunk(settings));
    }

    public logoutCurrentUser(): void {
        this.setCurrentUser(null);
    }

    private createInitializeCurrentUserThunk(): AppThunk {
        return (dispatch: AppDispatch): void => {
            const apiToken = findApiTokenFromCookie(this.cookieStorage);
            if (apiToken) {
                const refreshTokenSettings: RefreshTokenSettings = {
                    apiToken: apiToken,
                    isLoaderEnabled: true,
                };
                const fetchNewApiTokenThunk = this.createFetchNewApiTokenThunk(refreshTokenSettings);
                dispatch(fetchNewApiTokenThunk);
            }
            dispatch(this.createStartRefreshTokenIfNeededIntervalThunk());
        };
    }

    private createStartRefreshTokenIfNeededIntervalThunk(): AppThunk {
        return (dispatch: AppDispatch): void => {
            setInterval(() => {
                const isLoaderEnabled = false;
                const refreshApiTokenIfNeededThunk = this.createRefreshApiTokenIfNeededThunk(isLoaderEnabled);
                dispatch(refreshApiTokenIfNeededThunk);
            }, 1000);
        };
    }

    private createRefreshApiTokenIfNeededThunk(isLoaderEnabled: boolean): AppThunk {
        return (dispatch: AppDispatch): void => {
            const apiToken = findApiToken(this.getAuthState());
            if (!apiToken) {
                return;
            }
            const secondsUntilJwtExpiration = getSecondsUntilExpiration(apiToken);
            if (secondsUntilJwtExpiration > triggerApiTokenRefreshBeforeExpirationInSeconds) {
                return;
            }
            const refreshTokenSettings: RefreshTokenSettings = {
                apiToken: apiToken,
                isLoaderEnabled: isLoaderEnabled,
            };
            const fetchNewApiTokenThunk = this.createFetchNewApiTokenThunk(refreshTokenSettings);
            dispatch(fetchNewApiTokenThunk);
        };
    }

    private createAuthenticateThunk(settings: AuthenticateSettings): AppThunk {
        return (dispatch: AppDispatch): void => {
            dispatch(createStartApiTokenFetchAction());
            this.authBackendService.receiveAuthData({
                username: settings.username,
                password: settings.password,
                onSuccess: (authData: AuthData) => {
                    this.setCurrentUser({
                        authData: authData,
                        shouldRemember: settings.shouldRemember
                    });
                    dispatch(createEndApiTokenFetchAction());
                },
                onError: (): void => {
                    dispatch(createEndApiTokenFetchAction());
                },
                isLoaderEnabled: settings.isLoaderEnabled,
            });
        }
    }

    private createFetchNewApiTokenThunk(settings: RefreshTokenSettings): AppThunk {
        return (dispatch: AppDispatch): void => {
            if (isApiTokenBeingFetchedRightNow(this.getAuthState())) {
                return;
            }
            dispatch(createStartApiTokenFetchAction());
            this.authBackendService.receiveRefreshedAuthData({
                apiToken: settings.apiToken,
                onSuccess: (authData: AuthData) => {
                    dispatch(createEndApiTokenFetchAction());
                    this.setCurrentUser({authData: authData});
                    if (settings.onSuccess) {
                        settings.onSuccess();
                    }
                },
                onError: (): void => {
                    dispatch(createEndApiTokenFetchAction());
                    this.setCurrentUser(null);
                    if (settings.onError) {
                        settings.onError();
                    }
                },
                isLoaderEnabled: settings.isLoaderEnabled,
            });
        }
    }

    private setCurrentUser(currentUserSettings: (null | CurrentUserSettings)): void {
        this.cookieStorage.removeCookie(API_TOKEN_COOKIE_NAME);
        if(currentUserSettings === null) {
            this.cookieStorage.removeCookie(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
            const action = createReceiveCurrentAuthUserDataAction(null, null);
            this.dispatch(action);
            return;
        }
        this.userRepository.saveUserData(currentUserSettings.authData.user);
        const action = createReceiveCurrentAuthUserDataAction(
            currentUserSettings.authData.token,
            currentUserSettings.authData.user.id
        );
        this.dispatch(action);
        this.refreshApiTokenCookie(currentUserSettings.authData.token, currentUserSettings.shouldRemember);
    }

    private refreshApiTokenCookie(apiToken: string, newShouldRememberSetting?: boolean): void {
        const shouldRemember = (
            newShouldRememberSetting === undefined
                ? shouldRememberCurrentUser(this.cookieStorage)
                : newShouldRememberSetting
        );
        this.saveShouldRememberCookieSetting(this.cookieStorage, shouldRemember);
        let settings = {
            name: API_TOKEN_COOKIE_NAME,
            content: apiToken,
        };
        if (shouldRemember) {
            settings = Object.assign({}, settings, {
                timeToLiveInDays: apiTokenCookieTimeToLiveInDays
            });
        }
        this.cookieStorage.setCookie(settings);
    }

    private saveShouldRememberCookieSetting(cookieStorage: CookieStorageInterface, shouldRemember: boolean): void {
        cookieStorage.removeCookie(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
        if (shouldRemember) {
            cookieStorage.setCookie({
                name: SHOULD_REMEMBER_AUTH_COOKIE_NAME,
                content: 'true',
                timeToLiveInDays: apiTokenCookieTimeToLiveInDays,
            });
            return;
        }
    }
}

