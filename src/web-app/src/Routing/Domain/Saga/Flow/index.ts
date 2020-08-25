import { spawn } from "@redux-saga/core/effects";
import { RoutingStateSelector } from "web-app/Routing/Domain";
import { createHomePageSaga } from "../../../SubModules/HomePage/Domain";
import { AuthPagesStateSelector, createAuthPagesSaga } from "../../../SubModules/AuthPages/Domain";

export function createRoutingSaga(routingStateSelector: RoutingStateSelector): () => Generator {
    const authPagesStateSelector: AuthPagesStateSelector = (rootState: any) => routingStateSelector(rootState).authPages;
    return function* (): Generator {
        yield spawn(createHomePageSaga());
        yield spawn(createAuthPagesSaga(authPagesStateSelector));
    };
}
