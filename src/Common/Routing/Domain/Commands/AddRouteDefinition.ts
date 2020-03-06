import {CommandActionTypes} from "Common/Routing/Domain/RoutingMiddleware";

export function handleAddRouteDefinitionAction(action: AddRouteDefinition): void {
    //todo
}

export function createOpenUrlAction(settings: CreateOpenUrlActionSettings): OpenUrlAction {
    return {
        type: CommandActionTypes.ADD_ROUTE_DEFINITION,
        payload: settings
    };
}

type CreateOpenUrlActionSettings = {
    url: string,
    target: string,
};

export type AddRouteDefinition = {
    type: CommandActionTypes.OPEN_URL,
    payload: {
        url: string,
        target: string,
    }
};