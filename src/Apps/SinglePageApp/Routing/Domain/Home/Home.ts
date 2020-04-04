import {spawn} from "@redux-saga/core/effects";
import {createWatchLeakReduxStateSaga} from "SinglePageApp/Routing/Domain/Home/Command/LeakReduxState";
import {Route} from "Common/Router/Domain/Types";

export enum HomeCommandTypes {
    LEAK_REDUX_STATE = 'a8e50935-b646-4051-a727-f393c658d1e6',
}

export function createHomeSaga(): () => Generator {
    return function* homeSaga() {
        yield spawn(createWatchLeakReduxStateSaga());
    }
}

export const homeRoute: Route = {
    urlSchema: '/',
    urlMustMatchExactly: true,
};

export const createHomeRouteUrl = (): string => {
    return homeRoute.urlSchema;
};