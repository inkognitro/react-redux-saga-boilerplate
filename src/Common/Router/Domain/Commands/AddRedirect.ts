import {RouterCommandTypes} from "Common/Router/Domain/Router";
import {Redirect, RouterState, RouterStateSelector} from "Common/Router/Domain/Types";
import {Command} from "Common/Bootstrap/Domain/Command";
import {select, takeEvery, put} from "@redux-saga/core/effects";
import {findRedirectByExactRoute} from "Common/Router/Domain/Query/RedirectQuery";
import {createRedirectsWereAdded} from "Common/Router/Domain/Event/RedirectsWereAdded";

export function createWatchAddRedirectsSaga(routerStateSelector: RouterStateSelector): GeneratorFunction {
    const handleAddRedirects = function* (command: AddRedirects): Generator {
        //@ts-ignore
        const routerState: RouterState = yield select(routerStateSelector);
        let redirectsToAdd = [];
        for(let index in command.payload.redirects) {
            const redirect = command.payload.redirects[index];
            const storedRedirect = findRedirectByExactRoute(routerState, redirect.fromRoute);
            if(storedRedirect) {
                continue;
            }
            redirectsToAdd.push(redirect);
        }
        if(redirectsToAdd.length === 0) {
            return;
        }
        yield put(createRedirectsWereAdded(redirectsToAdd));
    };

    return <GeneratorFunction>function* watchAddRedirects(): Generator {
        yield takeEvery(RouterCommandTypes.ADD_REDIRECTS, handleAddRedirects);
    }
}

export function createAddRedirects(redirects: Redirect[]): AddRedirects {
    return {
        type: RouterCommandTypes.ADD_REDIRECTS,
        payload: {redirects}
    };
}

export type AddRedirects = Command<RouterCommandTypes.ADD_REDIRECTS, {
    redirects: Redirect[]
}>;