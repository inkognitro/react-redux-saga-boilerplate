import {CommandActionTypes} from "Common/RoutingWIP/Domain/RoutingMiddleware";

export function handleReplaceCurrentUrl(action: ReplaceCurrentUrl): void {
    //todo
}

export function createOpenUrlAction(settings: CreateReplaceCurrentUrlActionSettings): ReplaceCurrentUrl {
    return {
        type: CommandActionTypes.REPLACE_CURRENT_URL,
        payload: settings
    };
}

type CreateReplaceCurrentUrlActionSettings = {
    url: string,
};

export type ReplaceCurrentUrl = {
    type: CommandActionTypes.REPLACE_CURRENT_URL,
    payload: {
        url: string,
    }
};