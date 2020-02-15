import {AppDispatch} from "Common/types";
import {AuthState} from "Common/Auth/Domain/Types";
import {UserRepositoryInterface} from "Common/EntityCache/Domain/User/UserRepository";
import {
    createAuthenticateOrFailThunk,
    createInitializeCurrentUserThunk,
    createLogoutThunk,
    createStartRefreshTokenIfNeededIntervalThunk,
} from "Common/Auth/Domain/Actions";
import {CookieStorageInterface} from "Common/CookieHandling/Domain/CookieStorage";
import {AuthBackendService} from "Common/Auth/Domain/AuthBackendService";

export interface AuthManagerInterface {

}

type AuthStateSelector = () => AuthState;

export type AuthenticateSettings = {
    username: string,
    password: string,
    shouldRemember: boolean,
    onSuccess?(): void,
    onError?(): void,
    isLoaderEnabled: boolean,
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
        this.dispatch(createLogoutThunk(this.cookieStorage));
    }

    authenticate(settings: AuthenticateSettings): void {
        this.dispatch(createAuthenticateOrFailThunk(settings, this.cookieStorage, this.authBackendService));
    }
}