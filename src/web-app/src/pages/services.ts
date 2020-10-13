import { combineReducers } from 'redux';
import { spawn } from 'redux-saga/effects';
import { HomePageState, createHomePageSaga, homePageReducer } from './home/domain';
import { LoginPageState, createLoginPageSaga, loginPageReducer } from './login/domain';

export function createPagesSaga(pagesStateSelector: PagesStateSelector): () => Generator {
    const loginPageStateSelector = (state: any) => pagesStateSelector(state).loginPage;
    return function* () {
        yield spawn(createHomePageSaga());
        yield spawn(createLoginPageSaga(loginPageStateSelector));
    };
}

export type PagesState = {
    homePage: HomePageState;
    loginPage: LoginPageState;
};

export type PagesStateSelector = (state: any) => PagesState;

export const pagesReducer = combineReducers<PagesState>({
    homePage: homePageReducer,
    loginPage: loginPageReducer,
});
