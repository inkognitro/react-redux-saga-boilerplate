import {HomeEvent, HomeState} from "SinglePageApp/Routing/Domain/Home/Types";

const initialHomeState: HomeState = {
    foo: 'bar',
};

export function homeReducer(state: HomeState = initialHomeState, event?: HomeEvent): HomeState {
    if (event === undefined) {
        return state;
    }
    return state;
}