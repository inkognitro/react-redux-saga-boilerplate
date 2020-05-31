import { Command } from "Packages/Common/CommonTypes";
import { LoginPageCommandTypes } from "../Types";

export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}

export type Login = Command<LoginPageCommandTypes.LOGIN>;
