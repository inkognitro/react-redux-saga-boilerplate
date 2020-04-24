import { Message } from "Common/Domain/Form/Element/Types";
import { TextFieldStateWasChanged } from "Common/Domain/Form/Element/TextField/Event/TextFieldStateWasChanged";

export type TextFieldState = {
  id: string;
  type: Types;
  value: string;
  readOnly: boolean;
  messages: Message[];
};

export enum Types {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
}

export type TextFieldEvent = TextFieldStateWasChanged;

export enum TextFieldEventTypes {
  TEXT_FIELD_STATE_WAS_CHANGED = "TEXT_FIELD_STATE_WAS_CHANGED-3405aac6-1dbb-46ed-8750-cc37430284f1",
}
