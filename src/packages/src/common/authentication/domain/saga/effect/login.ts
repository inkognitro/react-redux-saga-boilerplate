import {
    call, CallEffect, put, StrictEffect, take,
} from "redux-saga/effects";
import uuidV4 from 'uuid/v4';
import { createErrorResult } from "packages/common/types/util/domain";
import { LoginErrorResult, LoginResult, LoginSettings } from "../../types";
import { createLogin, Login } from "../../command";
import {
    AuthEventTypes,
    UserLoginFailed,
    LoginWasCancelled,
    UserLoginWasNotExecuted, UserWasLoggedIn,
} from "../../event";

type LoginResultEventGenerator = Generator<StrictEffect, LoginResult>;

type LoginResultEvent = (LoginWasCancelled | UserLoginFailed | UserLoginWasNotExecuted | UserWasLoggedIn);

function createLoginErrorResult(): LoginErrorResult {
    return createErrorResult({ data: undefined });
}

function* internalLogin(settings: LoginEffectSettings): LoginResultEventGenerator {
    const command: Login = createLogin({
        loginId: uuidV4(),
        ...settings,
    });
    yield put(command);
    const { loginId } = command.payload;
    let eventLoginId: (null | string) = null;
    let event: (null | LoginResultEvent) = null;
    while (eventLoginId !== loginId) {
        // @ts-ignore
        event = yield take([
            AuthEventTypes.LOGIN_WAS_CANCELLED,
            AuthEventTypes.LOGIN_FAILED,
            AuthEventTypes.LOGIN_WAS_NOT_EXECUTED,
            AuthEventTypes.USER_WAS_LOGGED_IN,
        ]);
        if (event === null) {
            continue;
        }
        eventLoginId = event.payload.loginSettings.loginId;
    }
    if (event === null) {
        return createLoginErrorResult();
    }
    if (event.type === AuthEventTypes.LOGIN_FAILED) {
        return event.payload.result;
    }
    if (event.type === AuthEventTypes.USER_WAS_LOGGED_IN) {
        return event.payload.result;
    }
    return createLoginErrorResult();
}

export type LoginCallEffect = CallEffect<{
    context: any
    fn: LoginResultEventGenerator
    args: any[]
}>

export type LoginEffectSettings = Omit<LoginSettings, 'loginId'>;
export function login(settings: LoginEffectSettings): LoginCallEffect {
    // @ts-ignore
    return call(internalLogin, settings);
}
