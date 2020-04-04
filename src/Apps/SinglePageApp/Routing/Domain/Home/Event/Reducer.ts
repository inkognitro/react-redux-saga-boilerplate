import {HomeState} from "SinglePageApp/Routing/Domain/Home/Types";
import {Action} from "redux";

const initialHomeState: HomeState = {
    foo: 'bar',
};

export function homeReducer(state: HomeState = initialHomeState, event?: Action): HomeState {
    if (event === undefined) {
        return state;
    }
    return state;
}