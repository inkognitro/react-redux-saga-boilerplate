import {
    call, CallEffect, put, StrictEffect, take,
} from "redux-saga/effects";
import {
    AuthEventTypes,
    createLogout,
    LogoutErrorResult,
    LogoutResult, LogoutSuccessResult,
    UserLogoutWasNotExecuted,
    UserWasLoggedOut,
} from "Packages/Common/Authentication";
import { createErrorResult, createSuccessResult } from "Packages/Common/CommonTypes";

type LogoutResultEventGenerator = Generator<StrictEffect, LogoutResult>;

type LogoutResultEvent = (UserLogoutWasNotExecuted | UserWasLoggedOut);

function createLogoutSuccessResult(): LogoutSuccessResult {
    return createSuccessResult({ data: undefined });
}

function createLogoutErrorResult(): LogoutErrorResult {
    return createErrorResult({ data: undefined });
}

function* internalLogout(): LogoutResultEventGenerator {
    const command = createLogout();
    yield put(command);
    const { logoutId } = command.payload;
    let eventLogoutId: (null | string) = null;
    let event: (null | LogoutResultEvent) = null;
    while (eventLogoutId !== logoutId) {
        // @ts-ignore
        event = yield take([
            AuthEventTypes.USER_WAS_LOGGED_OUT,
            AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED,
        ]);
        if (event === null) {
            continue;
        }
        eventLogoutId = event.payload.logoutId;
    }
    if (event === null) {
        return createLogoutErrorResult();
    }
    if (event.type === AuthEventTypes.USER_WAS_LOGGED_OUT) {
        return createLogoutSuccessResult();
    }
    return createLogoutErrorResult();
}

export type LogoutCallEffect = CallEffect<{
    context: any
    fn: LogoutResultEventGenerator
    args: any[]
}>

export function logout(): LogoutCallEffect {
    // @ts-ignore
    return call(internalLogout);
}
