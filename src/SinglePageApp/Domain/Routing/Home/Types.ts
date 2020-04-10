import {PartialStateWasChanged} from "./Event/PartialStateWasChanged";
import {TextFieldState} from "Common/Domain/Form/Element/TextField/Types";

export type HomeState = {
    toastContentTextField: TextFieldState,
};

export enum HomeEventTypes {
    PARTIAL_STATE_WAS_CHANGED = 'PARTIAL_STATE_WAS_CHANGED-a8e50935-b646-4051-a727-f393c658d1e6',
}

export type HomeEvent = (PartialStateWasChanged);