import { Command } from "packages/entity/common-types";
import { LoginSettings } from "../Types";
import { AuthCommandTypes } from "./Types";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: AuthCommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<AuthCommandTypes.LOGIN, LoginSettings>;
