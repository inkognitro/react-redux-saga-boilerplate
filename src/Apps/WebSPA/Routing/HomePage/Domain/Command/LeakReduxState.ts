import { Command } from "Packages/Common/CommonTypes";
import { HomePageCommandTypes } from "../Types";

export function createLeakReduxState(): LeakReduxState {
    return {
        type: HomePageCommandTypes.LEAK_REDUX_STATE,
        payload: undefined,
    };
}

export type LeakReduxState = Command<HomePageCommandTypes.LEAK_REDUX_STATE>;
