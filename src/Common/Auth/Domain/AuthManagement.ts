import {AppDispatch} from "Common/types";
import {AuthState} from "Common/Auth/Domain/Types";
import {UserRepositoryInterface} from "Common/EntityCache/Domain/User/UserRepository";
import {
    createInitializeCurrentUserThunk, createLogoutThunk, createStartRefreshTokenIfNeededIntervalThunk,
} from "Common/Auth/Domain/Actions";
import {CookieStorageInterface} from "Common/CookieHandling/Domain/CookieStorage";

export interface AuthManagerInterface {

}

type AuthDataFromBackend = {
    user: {
        id: string,
        username: string,
    },
    apiToken: string
};

export interface AuthBackendService {
    findAuthDataByCredentials(username: string, password: string): Promise<(null | AuthDataFromBackend)>
    findRefreshedAuthDataByApiToken(apiToken: string): Promise<(null | AuthDataFromBackend)>
}

type AuthStateSelector = () => AuthState;

export type AuthenticateOrFailSettings = {
    username: string,
    password: string,
    shouldRemember: boolean,
    onSuccess?(): void,
    onError?(): void,
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
        cookieStorage: CookieStorageInterface
    ) {
        this.dispatch = dispatch;
        this.getAuthState = getAuthState;
        this.userRepository = userRepository;
        this.cookieStorage = cookieStorage;
    }

    startRefreshTokenIfNeededInterval(): void {
        this.dispatch(createStartRefreshTokenIfNeededIntervalThunk(this.getAuthState));
    }

    initializeCurrentUser(): void {
        this.dispatch(createInitializeCurrentUserThunk(this.getAuthState, this.cookieStorage));
    }

    logoutCurrentUser(): void {
        createLogoutThunk(this.cookieStorage);
    }

    authenticateOrFailByCredentials(settings: AuthenticateOrFailSettings): void {

    }
}