import { Command } from "Packages/Entity/CommonTypes";
import { LoginPageCommandTypes } from "./Types";

export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}

export type Login = Command<LoginPageCommandTypes.LOGIN>;
