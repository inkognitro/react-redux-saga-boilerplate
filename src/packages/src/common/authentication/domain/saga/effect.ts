import { put, StrictEffect, take } from 'redux-saga/effects';
import { createLogin, createLogout } from '../command';
import { LoginResult, LoginSettings } from '../types';
import { AuthEventTypes, LoginFailed, LoginWasCancelled, UserWasLoggedIn } from '../event';

const loginFinishEventTypes = [
    AuthEventTypes.USER_WAS_LOGGED_IN,
    AuthEventTypes.LOGIN_FAILED,
    AuthEventTypes.LOGIN_WAS_CANCELLED,
];

type LoginFinishEvent = UserWasLoggedIn | LoginFailed | LoginWasCancelled;

export function* login(settings: LoginSettings): Generator<StrictEffect, LoginResult> {
    const command = createLogin(settings);
    yield put(command);
    while (true) {
        //  @ts-ignore
        const event: LoginFinishEvent = yield take(loginFinishEventTypes);
        if (event.payload.taskId !== command.payload.taskId) {
            continue;
        }
        if (event.type === AuthEventTypes.USER_WAS_LOGGED_IN) {
            return event.payload.result;
        }
        if (event.type === AuthEventTypes.LOGIN_FAILED) {
            return event.payload.result;
        }
        return null;
    }
}

export function* logout(): Generator<StrictEffect, void> {
    yield put(createLogout());
}
