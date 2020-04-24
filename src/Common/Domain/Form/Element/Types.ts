import {
    TextFieldEvent,
    TextFieldState,
} from "Common/Domain/Form/Element/TextField/Types";

export type Message = {
  id: string;
  type: MessageTypes;
  content: string;
};

export enum MessageTypes {
  ERROR = "error",
}

export type FormElementReducer<State> = (
  state: State,
  event?: TextFieldEvent
) => TextFieldState;
