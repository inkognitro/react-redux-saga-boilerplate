import { Command } from "packages/entity/common-types";
import { LoginPageCommandTypes } from "./Types";

export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}

export type Login = Command<LoginPageCommandTypes.LOGIN>;
