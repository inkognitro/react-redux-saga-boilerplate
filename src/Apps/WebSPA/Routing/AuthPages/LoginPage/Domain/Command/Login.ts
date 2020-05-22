import { LoginPageCommandTypes } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Types";
import {Command} from "Packages/Common/Types";

export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}

export type Login = Command<LoginPageCommandTypes.LOGIN>;
