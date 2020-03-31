import {Toast, ToasterState} from "Common/ToasterOld/Domain/Types";

export function getToasts(state: ToasterState): Toast[] {
    return state.toasts;
}