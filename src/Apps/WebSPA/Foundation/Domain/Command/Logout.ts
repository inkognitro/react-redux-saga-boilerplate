import { Command } from "Packages/Entity/CommonTypes";
import { FoundationCommandTypes } from "../Types";

export function createLogout(): Logout {
    return {
        type: FoundationCommandTypes.LOGOUT,
        payload: undefined,
    };
}

export type Logout = Command<FoundationCommandTypes.LOGOUT>;
