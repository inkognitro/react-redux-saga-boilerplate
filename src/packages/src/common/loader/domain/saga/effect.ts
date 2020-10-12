import { put } from 'redux-saga/effects';
import { createHideLoader, createShowLoader } from '../command';

export function* showLoader(): Generator {
    yield put(createShowLoader());
}

export function* hideLoader(): Generator {
    yield put(createHideLoader());
}
