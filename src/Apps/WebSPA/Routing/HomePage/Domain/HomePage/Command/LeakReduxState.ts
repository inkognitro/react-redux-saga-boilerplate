import { HomePageCommandTypes } from "Apps/WebSPA/Routing/HomePage/Domain/HomePage/Types";
import {Command} from "Packages/Common/Types";

export function createLeakReduxState(): LeakReduxState {
    return {
        type: HomePageCommandTypes.LEAK_REDUX_STATE,
        payload: undefined,
    };
}

export type LeakReduxState = Command<HomePageCommandTypes.LEAK_REDUX_STATE>;
