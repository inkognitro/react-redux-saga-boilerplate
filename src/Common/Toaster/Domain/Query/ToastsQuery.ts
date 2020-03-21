import {Toast, ToasterState} from "Common/Toaster/Domain/Types";

export function getToasts(state: ToasterState): Toast[] {
    return state.toasts;
}