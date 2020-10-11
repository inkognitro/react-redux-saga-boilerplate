import { Reducer, Action } from 'redux';
import { createTextFieldState } from "packages/common/form-element/domain";
import { HomePageState } from "./types";

const initialHomePageState: HomePageState = {
    toastContent: createTextFieldState({ value: 'Hi there :)' }),
};

export const homePageReducer: Reducer<HomePageState> = (state = initialHomePageState, _: Action) => state;
