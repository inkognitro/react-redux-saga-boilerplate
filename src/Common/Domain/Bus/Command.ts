import { Action } from "redux";

export type Command<Type = any, Payload = undefined> = Action<Type> & {
  payload: Payload;
};
