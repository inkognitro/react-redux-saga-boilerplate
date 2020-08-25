import { Command } from "packages/entity/common-types";
import { FoundationCommandTypes } from "../Types";

export function createLogout(): Logout {
    return {
        type: FoundationCommandTypes.LOGOUT,
        payload: undefined,
    };
}

export type Logout = Command<FoundationCommandTypes.LOGOUT>;
