import {RootState} from "App/Redux/root";
import {Toast} from "App/Redux/Toaster/Toast/types";

//todo: use reselect library for performance optimization

export function getToasts(state: RootState): Toast[] {
    return state.toaster.toasts;
}