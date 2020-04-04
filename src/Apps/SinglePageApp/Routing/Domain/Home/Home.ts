import {spawn} from "@redux-saga/core/effects";
import {createWatchLeakReduxStateSaga} from "SinglePageApp/Routing/Domain/Home/Command/LeakReduxState";
import {Route} from "Common/Router/Domain/Types";
import {createChangePartialStateSaga} from "SinglePageApp/Routing/Domain/Home/Command/ChangePartialState";

export enum HomeCommandTypes {
    LEAK_REDUX_STATE = 'LEAK_REDUX_STATE-a8e50935-b646-4051-a727-f393c658d1e6',
    CHANGE_PARTIAL_STATE = 'CHANGE_TEST_TEXT_FIELD_VALUE-a8e50935-b646-4051-a727-f393c658d1e6',
}

export function createHomeSaga(): () => Generator {
    return function* homeSaga() {
        yield spawn(createWatchLeakReduxStateSaga());
        yield spawn(createChangePartialStateSaga());
    }
}

export const homeRoute: Route = {
    urlSchema: '/',
    urlMustMatchExactly: true,
};

export const createHomeRouteUrl = (): string => {
    return homeRoute.urlSchema;
};