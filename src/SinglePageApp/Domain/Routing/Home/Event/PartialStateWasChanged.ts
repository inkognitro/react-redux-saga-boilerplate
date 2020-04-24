import { Event } from "Common/Domain/Bus/Event";
import { HomeEventTypes, HomeState } from "../Types";

export function createPartialStateWasChanged(
    state: Partial<HomeState>,
): PartialStateWasChanged {
    return {
        type: HomeEventTypes.PARTIAL_STATE_WAS_CHANGED,
        payload: state,
    };
}

export type PartialStateWasChanged = Event<
  HomeEventTypes.PARTIAL_STATE_WAS_CHANGED,
  Partial<HomeState>
>;
