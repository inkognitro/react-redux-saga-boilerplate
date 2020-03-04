import {Toast, ToasterState} from "Common/Toaster/Domain/Types";

export type getToasterState<RootState> = (rootState: RootState) => ToasterState;

export function getToasts(state: ToasterState): Toast[] {
    return state.toasts;
}