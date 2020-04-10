import {HomeEvent, HomeEventTypes, HomeState} from "../Types";

const initialHomeState: HomeState = {
    toastContent: 'Hi there :)',
};

export function homeReducer(state: HomeState = initialHomeState, event?: HomeEvent): HomeState {
    if (event === undefined) {
        return state;
    }
    if (event.type === HomeEventTypes.PARTIAL_STATE_WAS_CHANGED) {
        return {
            ...state,
            ...event.payload,
        };
    }
    return state;
}