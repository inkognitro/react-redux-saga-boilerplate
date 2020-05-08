import { PartialStateWasChanged } from "SinglePageApp/Domain/Routing/Home/Event/PartialStateWasChanged";
import {TextFieldState} from "Common/Domain/FormUtils/FormElements/Types";

export type HomeState = {
  toastContentField: TextFieldState;
};

export enum HomeEventTypes {
  PARTIAL_STATE_WAS_CHANGED = "PARTIAL_STATE_WAS_CHANGED-a8e50935-b646-4051-a727-f393c658d1e6",
}

export type HomeEvent = PartialStateWasChanged;
