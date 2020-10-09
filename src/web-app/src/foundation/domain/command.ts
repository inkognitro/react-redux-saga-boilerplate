import { Command } from "packages/common/entity-base/common-types";

export enum FoundationCommandTypes {
    LOGOUT = "LOGOUT-ae1fa78b-8e48-4091-bb99-78078fc25518",
}

export function createLogout(): Logout {
    return {
        type: FoundationCommandTypes.LOGOUT,
        payload: undefined,
    };
}

export type Logout = Command<FoundationCommandTypes.LOGOUT>;
