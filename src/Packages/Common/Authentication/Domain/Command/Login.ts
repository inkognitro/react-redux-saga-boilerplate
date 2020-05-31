import { Command } from "Packages/Common/CommonTypes";
import { AuthCommandTypes, LoginSettings } from "../Types";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: AuthCommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<AuthCommandTypes.LOGIN, LoginSettings>;
