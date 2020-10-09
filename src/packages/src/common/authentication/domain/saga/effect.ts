import { put } from 'redux-saga/effects';
import { createLogin } from "../command";
import { LoginSettings } from "../types";

export function* Login(settings: LoginSettings): Generator {
    yield put(createLogin(settings));
}

