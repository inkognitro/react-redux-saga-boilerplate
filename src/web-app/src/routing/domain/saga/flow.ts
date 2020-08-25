import { spawn } from "@redux-saga/core/effects";
import { RoutingStateSelector } from "web-app/routing/domain";
import { createHomePageSaga } from "../../sub-modules/home-page/domain";
import { AuthPagesStateSelector, createAuthPagesSaga } from "../../sub-modules/auth-pages/domain";

export function createRoutingSaga(routingStateSelector: RoutingStateSelector): () => Generator {
    const authPagesStateSelector: AuthPagesStateSelector = (rootState: any) => routingStateSelector(rootState).authPages;
    return function* (): Generator {
        yield spawn(createHomePageSaga());
        yield spawn(createAuthPagesSaga(authPagesStateSelector));
    };
}
