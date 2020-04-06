import {CommandBus} from "Common/Bootstrap/CommandBus";
import {EventBus} from "Common/Bootstrap/EventBus";
import {
    createAuthenticate,
    ErrorData as AuthenticateErrorResult,
    ReadResponseBody as AuthenticateSuccessResult
} from "Common/RequestHandling/Domain/ApiV1/Http/Callables/Auth/Authenticate";
import {createUserWasLoggedIn} from "Common/AuthenticationWIP/Domain/Event/UserWasLoggedIn";
import {createUserLoginFailed} from "Common/AuthenticationWIP/Domain/Event/UserLoginFailed";
import {createSaveCookie, SaveCookieSettings} from "Common/Cookie/Domain/Command/SaveCookie";
import {createRemoveCookie} from "Common/Cookie/Domain/Command/RemoveCookie";
import {CurrentAuthUserReader} from "Common/AuthenticationWIP/Domain/Query/CurrentAuthUserQuery";
import {createUserWasLoggedOut} from "Common/AuthenticationWIP/Domain/Event/UserWasLoggedOut";
import {
    createRefreshAuthentication,
    ErrorResult as RefreshAuthenticationErrorResult,
    SuccessResult as RefreshAuthenticationSuccessResult
} from "Common/RequestHandling/Domain/ApiV1/Http/Command/Auth/RefreshAuthentication";
import {createUserAuthenticationWasRefreshed} from "Common/AuthenticationWIP/Domain/Event/UserAuthenticationWasRefreshed";
import {createUserAuthenticationRefreshFailed} from "Common/AuthenticationWIP/Domain/Event/UserAuthenticationRefreshFailed";
import {CookieContentReader} from "Common/Cookie/Domain/Query/CookieQuery";
import {IsAuthenticationRunningQuery} from "Common/AuthenticationWIP/Domain/Query/IsAuthenticationRunningQuery";
import {getSecondsUntilExpiration} from "Common/AuthenticationWIP/Domain/JWTHandling";
import {LoginSettings} from "Common/AuthenticationWIP/Domain/Command/Login";

const authTokenCookieName = 'authToken';
const authTokenCookieTimeToLiveInDays = 14;
const authRefreshBeforeExpirationInSeconds = 60;

export class AuthenticationOld {
    private readonly commandBus: CommandBus;
    private readonly eventBus: EventBus;
    private readonly currentAuthUserReader: CurrentAuthUserReader;
    private readonly cookieContentReader: CookieContentReader;
    private readonly isAuthenticationRunningQuery: IsAuthenticationRunningQuery;
    private refreshAuthenticationInterval: (null | number);

    constructor(
        commandBus: CommandBus,
        eventBus: EventBus,
        currentAuthUserReader: CurrentAuthUserReader,
        cookieContentReader: CookieContentReader,
        isAuthenticationRunningQuery: IsAuthenticationRunningQuery
    ) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.currentAuthUserReader = currentAuthUserReader;
        this.cookieContentReader = cookieContentReader;
        this.isAuthenticationRunningQuery = isAuthenticationRunningQuery;
        this.refreshAuthenticationInterval = null;
    }

    public initializeCurrentUser(): void
    {
        const authToken = this.cookieContentReader.find(authTokenCookieName);
        if(authToken === null) {
            return;
        }
        const shouldRemember = true;
        this.refreshAuthentication({
            shouldRemember: shouldRemember,
            isLoaderEnabled: true,
        });
        this.setRefreshAuthenticationInterval(shouldRemember);
    }

    private clearRefreshAuthenticationInterval(): void {
        if(this.refreshAuthenticationInterval !== null) {
            clearInterval(this.refreshAuthenticationInterval);
        }
    }

    private setRefreshAuthenticationInterval(shouldRemember: boolean): void
    {
        this.clearRefreshAuthenticationInterval();
        //@ts-ignore
        this.refreshAuthenticationInterval = setInterval(() => {
            const authUser = this.currentAuthUserReader.find();
            const shouldRefresh = (
                authUser
                && authRefreshBeforeExpirationInSeconds > getSecondsUntilExpiration(authUser.token)
                && this.isAuthenticationRunningQuery.execute()
            );
            if(shouldRefresh) {
                this.refreshAuthentication({
                    isLoaderEnabled: false,
                    shouldRemember: shouldRemember
                });
            }
        }, 10000);
    }

    private refreshAuthentication(refreshSettings: RefreshAuthenticationSettings): void {
        if(this.isAuthenticationRunningQuery.execute()) {
            return;
        }
        const currentAuthUser = this.currentAuthUserReader.find();
        if(!currentAuthUser) {
            return;
        }
        const command = createRefreshAuthentication({
            token: currentAuthUser.token,
            isLoaderEnabled: refreshSettings.isLoaderEnabled,
            onSuccess: (result: RefreshAuthenticationSuccessResult): void => {
                this.updateAuthenticationCookie(result, refreshSettings.shouldRemember);
                this.eventBus.handle(createUserAuthenticationWasRefreshed({
                    token: result.token,
                    user: result.user,
                }));
                if(refreshSettings.onSuccess) {
                    refreshSettings.onSuccess();
                }
            },
            onError: (_: RefreshAuthenticationErrorResult): void => {
                this.eventBus.handle(createUserAuthenticationRefreshFailed());
                if(refreshSettings.onError) {
                    refreshSettings.onError();
                }
            },
        });
        this.commandBus.handle(command);
    }

    public login(loginSettings: LoginSettings): void {
        if(this.isAuthenticationRunningQuery.execute()) {
            return;
        }
        const command = createAuthenticate({
            username: loginSettings.username,
            password: loginSettings.password,
            isLoaderEnabled: true,
            onSuccess: (result: AuthenticateSuccessResult): void => {
                this.updateAuthenticationCookie(result, loginSettings.shouldRemember);
                this.eventBus.handle(createUserWasLoggedIn({
                    token: result.token,
                    user: result.user,
                }));
                this.setRefreshAuthenticationInterval(loginSettings.shouldRemember);
                if(loginSettings.onSuccess) {
                    loginSettings.onSuccess();
                }
            },
            onError: (_: AuthenticateErrorResult): void => {
                this.eventBus.handle(createUserLoginFailed());
                if(loginSettings.onError) {
                    loginSettings.onError();
                }
            },
        });
        this.commandBus.handle(command);
    }

    public logout(): void {
        if(!this.currentAuthUserReader.find()) {
            return;
        }
        this.clearRefreshAuthenticationInterval();
        this.removeAuthenticationCookie();
        this.commandBus.handle(createRemoveCookie(authTokenCookieName));
        this.commandBus.handle(createUserWasLoggedOut());
    }

    private updateAuthenticationCookie(result: AuthenticateSuccessResult, shouldRemember: boolean): void {
        let cookieSettings: SaveCookieSettings = {
            name: authTokenCookieName,
            content: result.token
        };
        if(shouldRemember) {
            cookieSettings.timeToLiveInDays = authTokenCookieTimeToLiveInDays
        }
        this.commandBus.handle(createSaveCookie(cookieSettings));
    }

    private removeAuthenticationCookie(): void {
        this.commandBus.handle(createRemoveCookie(authTokenCookieName));
    }
}

export type RefreshAuthenticationSettings = {
    isLoaderEnabled: boolean,
    shouldRemember: boolean,
    onSuccess?(): void,
    onError?(): void,
};