import {Command} from "Common/AppBase/CommandBus";
import {Route} from "Common/Routing/Domain/Types";
import {CommandTypes} from "Common/Routing/Domain/Commands/CommandHandler";
import {Reducer} from "redux";
import {AddRouteSettings} from "Common/Routing/Domain/Router";

export function createAddRoute(route: Route, reducer: Reducer): AddRoute {
    return {
        type: CommandTypes.ADD_ROUTE,
        payload: {
            route: route,
            reducer: reducer,
        }
    };
}

export type AddRoute = Command<CommandTypes.ADD_ROUTE, AddRouteSettings>;