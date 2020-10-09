import { Command } from "packages/common/types/util/domain";

export enum HomePageCommandTypes {
    LEAK_REDUX_STATE = "LEAK_REDUX_STATE-a8e50935-b646-4051-a727-f393c658d1e6",
}

export function createLeakReduxState(): LeakReduxState {
    return {
        type: HomePageCommandTypes.LEAK_REDUX_STATE,
        payload: undefined,
    };
}

export type LeakReduxState = Command<HomePageCommandTypes.LEAK_REDUX_STATE>;
