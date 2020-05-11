import { Command } from "Common/Domain/Bus/Command";
import { LoginPageCommandTypes } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Types";

export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}

export type Login = Command<LoginPageCommandTypes.LOGIN>;
