import { AuthEventTypes } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserLoginWasStarted(
    payload: Payload,
): UserLoginWasRequested {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
        payload,
    };
}

export type UserLoginWasRequested = Event<
  AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
  Payload
>;

type Payload = {
  username: string;
  password: string;
};
