import {
    call, CallEffect, put, StrictEffect, take,
} from "redux-saga/effects";
import { Result } from "Packages/Common/CommonTypes";
import {
    AuthEventTypes,
    createLogin,
    Login,
    LoginResult,
    LoginSettings,
    UserLoginFailed,
    UserLoginWasCancelled,
    UserLoginWasNotExecuted,
    UserWasLoggedIn,
} from "Packages/Common/Authentication";

export type LoginResultEventGenerator = Generator<StrictEffect, LoginResult>;

const loginResultEventTypes = [
    AuthEventTypes.USER_LOGIN_WAS_CANCELLED,
    AuthEventTypes.USER_LOGIN_FAILED,
    AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED,
    AuthEventTypes.USER_WAS_LOGGED_IN,
];

type LoginResultEvent = (UserLoginWasCancelled | UserLoginFailed | UserLoginWasNotExecuted | UserWasLoggedIn);

function* internalLogin(settings: LoginSettings): LoginResultEventGenerator {
    const command: Login = createLogin(settings);
    yield put(command);
    const { loginId } = command.payload;
    let eventLoginId: (null | string) = null;
    while (eventLoginId === loginId) {
        // @ts-ignore
        const event: LoginResultEvent = yield take(loginResultEventTypes);
        eventLoginId = event.payload.loginSettings.loginId;
    }
    /*
    if (event.type === AuthEventTypes.USER_LOGIN_WAS_CANCELLED) { }
    */
    // define if above also for other events!
}

type LoginCallEffect = CallEffect<{
    context: any
    fn: LoginResultEventGenerator
    args: any[]
}>

export function login(result: Result): LoginCallEffect {
    // @ts-ignore
    return call(internalLogin, result);
}
