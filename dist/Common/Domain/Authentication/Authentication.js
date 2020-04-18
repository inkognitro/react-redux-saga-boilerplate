"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const Types_1 = require("Common/Domain/Authentication/Types");
const Authenticate_1 = require("Common/Domain/RequestHandling/ApiV1/Http/Saga/Callables/Auth/Authenticate");
const UserLoginFailed_1 = require("Common/Domain/Authentication/Event/UserLoginFailed");
const SaveCookie_1 = require("Common/Domain/Cookie/Command/SaveCookie");
const UserWasLoggedIn_1 = require("Common/Domain/Authentication/Event/UserWasLoggedIn");
const UserLoginWasCancelled_1 = require("Common/Domain/Authentication/Event/UserLoginWasCancelled");
const CurrentAuthUserQuery_1 = require("Common/Domain/Authentication/Query/CurrentAuthUserQuery");
const UserWasLoggedOut_1 = require("Common/Domain/Authentication/Event/UserWasLoggedOut");
const authTokenCookieName = 'authUser';
const authTokenCookieTimeToLiveInDays = 14;
function createAuthenticationFlow(authStateSelector) {
    function* handleAutomaticAuthenticationRefresh(_) {
        while (true) {
            yield effects_1.delay(5000);
            console.log('handleAutomaticAuthenticationRefresh');
        }
    }
    function* handleLogin(command) {
        try {
            const responseData = yield effects_1.call(Authenticate_1.authenticate, {
                username: command.payload.username,
                password: command.payload.password,
                isLoaderEnabled: true,
            });
            if (!responseData) {
                yield effects_1.put(UserLoginFailed_1.createUserLoginFailed(command.payload));
            }
            if (responseData.type === Authenticate_1.ResponseDataTypes.SUCCESS) {
                const authUser = {
                    token: responseData.token,
                    user: responseData.user,
                };
                yield effects_1.put(SaveCookie_1.createSaveCookie({
                    name: authTokenCookieName,
                    content: JSON.stringify(authUser),
                    timeToLiveInDays: (command.payload.shouldRemember ? authTokenCookieTimeToLiveInDays : undefined),
                }));
                yield effects_1.put(UserWasLoggedIn_1.createUserWasLoggedIn(authUser));
                yield effects_1.fork(handleAutomaticAuthenticationRefresh, command.payload.shouldRemember);
                return;
            }
            if (responseData.type === Authenticate_1.ResponseDataTypes.ERROR) {
                yield effects_1.put(UserLoginFailed_1.createUserLoginFailed(command.payload));
                return;
            }
        }
        finally {
            if (yield effects_1.cancelled()) {
                yield effects_1.put(UserLoginWasCancelled_1.createUserLoginWasCancelled(command.payload));
            }
        }
    }
    return function* () {
        while (true) {
            const command = yield effects_1.take([Types_1.AuthCommandTypes.LOGIN]);
            const loginTask = yield effects_1.fork(handleLogin, command);
            const action = yield effects_1.take([
                Types_1.AuthEventTypes.USER_LOGIN_FAILED,
                Types_1.AuthCommandTypes.LOGOUT
            ]);
            if (action.type === Types_1.AuthEventTypes.USER_LOGIN_FAILED) {
                continue;
            }
            if (action.type === Types_1.AuthCommandTypes.LOGOUT) {
                yield effects_1.cancel(loginTask);
                const authState = yield effects_1.select(authStateSelector);
                const authUser = CurrentAuthUserQuery_1.findCurrentAuthUser(authState);
                if (!authUser) {
                    continue;
                }
                yield effects_1.put(UserWasLoggedOut_1.createUserWasLoggedOut());
            }
        }
    };
}
exports.createAuthenticationFlow = createAuthenticationFlow;
//# sourceMappingURL=Authentication.js.map