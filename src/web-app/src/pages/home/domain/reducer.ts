import { Reducer, combineReducers } from 'redux';
import { createFormElementReducer, createTextFieldState, TextFieldState } from "packages/common/form-element/domain";
import { HomePageState } from "./types";

export const homePageReducer: Reducer<HomePageState> = combineReducers({
    toastContent: createFormElementReducer<TextFieldState>(createTextFieldState({ value: 'Change content and press enter..' })),
});
