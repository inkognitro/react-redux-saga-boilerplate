import {call, cancel, cancelled, fork, put, select, take, delay} from "@redux-saga/core/effects";
import {Login} from "Common/Domain/Authentication/Command/Login";
import {AuthCommandTypes} from "Common/Domain/Authentication/Authentication";
import {
    authenticate,
    ResponseData,
    ResponseDataTypes
} from "Common/Domain/RequestHandling/ApiV1/Http/Callables/Auth/Authenticate";
import {createUserWasLoggedIn} from "Common/Domain/Authentication/Event/UserWasLoggedIn";
import {AuthEventTypes, AuthState, AuthStateSelector, AuthUser} from "Common/Domain/Authentication/Types";
import {Action} from "redux";
import {createUserWasLoggedOut} from "Common/Domain/Authentication/Event/UserWasLoggedOut";
import {createUserLoginFailed} from "Common/Domain/Authentication/Event/UserLoginFailed";
import {findCurrentAuthUser} from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import {createUserLoginWasCancelled} from "Common/Domain/Authentication/Event/UserLoginWasCancelled";
import {createSaveCookie} from "Common/Domain/Cookie/Command/SaveCookie";

const authTokenCookieName = 'authUser';
const authTokenCookieTimeToLiveInDays = 14;
//const authRefreshBeforeExpirationInSeconds = 60; //todo use for authentication refresh!

export function createAuthenticationFlow(authStateSelector: AuthStateSelector): GeneratorFunction {
    function* handleAutomaticAuthenticationRefresh(shouldRemember: boolean): Generator {
        while(true) {
            yield delay(5000);
            console.log('handleAutomaticAuthenticationRefresh'); //todo: remove!
        }
    }

    function* handleLogin(command: Login): Generator {
        try {
            //@ts-ignore
            const responseData: ResponseData = yield call(authenticate,{
                username: command.payload.username,
                password: command.payload.password,
                isLoaderEnabled: true,
            });
            if(!responseData) {
                yield put(createUserLoginFailed(command.payload));
            }
            if(responseData.type === ResponseDataTypes.SUCCESS) {
                const authUser: AuthUser = {
                    token: responseData.token,
                    user: responseData.user,
                };
                yield put(createSaveCookie({
                    name: authTokenCookieName,
                    content: JSON.stringify(authUser),
                    timeToLiveInDays: (command.payload.shouldRemember ? authTokenCookieTimeToLiveInDays : undefined),
                }));
                yield put(createUserWasLoggedIn(authUser));
                yield fork(handleAutomaticAuthenticationRefresh, command.payload.shouldRemember); //todo: check task must be defined explicitly
                return;
            }
            if(responseData.type === ResponseDataTypes.ERROR) {
                yield put(createUserLoginFailed(command.payload));
                return;
            }
        } finally {
            if (yield cancelled()) {
                yield put(createUserLoginWasCancelled(command.payload));
            }
        }
    }

    return <GeneratorFunction>function* authenticationFlow(): Generator {
        while (true) {
            //@ts-ignore
            const command: Login = yield take([AuthCommandTypes.LOGIN]);
            const loginTask = yield fork(handleLogin, command);
            //@ts-ignore
            const action: Action = yield take([
                AuthEventTypes.USER_LOGIN_FAILED,
                AuthCommandTypes.LOGOUT
            ]);
            if(action.type === AuthEventTypes.USER_LOGIN_FAILED) {
                continue;
            }
            if(action.type === AuthCommandTypes.LOGOUT) {
                //@ts-ignore
                yield cancel(loginTask);
                //@ts-ignore
                const authState: AuthState = yield select(authStateSelector);
                const authUser = findCurrentAuthUser(authState);
                if(!authUser) {
                    continue;
                }
                yield put(createUserWasLoggedOut());
            }
        }
    }
}