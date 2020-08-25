import {Command} from "packages/entity/common-types";

export enum LoginPageCommandTypes {
    LOGIN = "LOGIN-7b0d7106-9bb4-4814-aa9c-94ceb0f26f48",
}

export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}

export type Login = Command<LoginPageCommandTypes.LOGIN>;
