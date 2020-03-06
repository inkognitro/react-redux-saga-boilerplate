import {CommandActionTypes} from "Common/Routing/Domain/RoutingMiddleware";

export function handleOpenUrl(action: OpenUrl): void {
    //todo
}

export function createOpenUrlAction(settings: CreateOpenUrlActionSettings): OpenUrl {
    return {
        type: CommandActionTypes.OPEN_URL,
        payload: settings
    };
}

type CreateOpenUrlActionSettings = {
    url: string,
    target: string,
};

export type OpenUrl = {
    type: CommandActionTypes.OPEN_URL,
    payload: {
        url: string,
        target: string,
    }
};