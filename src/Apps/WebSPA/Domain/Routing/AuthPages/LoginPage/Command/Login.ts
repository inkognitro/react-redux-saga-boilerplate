import { Command } from "Packages/Common/Domain/Bus/Command";
import { LoginPageCommandTypes } from "Apps/WebSPA/Domain/Routing/AuthPages/LoginPage/Types";

export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}

export type Login = Command<LoginPageCommandTypes.LOGIN>;
