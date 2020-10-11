import { Command } from "packages/common/types/util/domain";

export enum LoginPageCommandTypes {
    LOGIN = "LOGIN-e8dfd12c-6b9d-4334-bd63-c56551f84b39",
}

export type Login = Command<LoginPageCommandTypes.LOGIN>
export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}
