import { Command } from "Common/Domain/Bus/Command";
import { HomePageCommandTypes } from "SinglePageApp/Domain/Routing/HomePage/Types";

export function createLeakReduxState(): LeakReduxState {
    return {
        type: HomePageCommandTypes.LEAK_REDUX_STATE,
        payload: undefined,
    };
}

export type LeakReduxState = Command<HomePageCommandTypes.LEAK_REDUX_STATE>;
