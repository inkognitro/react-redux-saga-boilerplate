import { combineReducers } from 'redux';
import { spawn } from 'redux-saga/effects';
import { HomePageState, createHomePageSaga, homePageReducer } from "./home/domain";

export function createPagesSaga(): () => Generator {
    return function* () {
        yield spawn(createHomePageSaga());
    }
}

export type PagesState = {
    homePage: HomePageState
}

export const pagesReducer = combineReducers<PagesState>({
    homePage: homePageReducer,
});
