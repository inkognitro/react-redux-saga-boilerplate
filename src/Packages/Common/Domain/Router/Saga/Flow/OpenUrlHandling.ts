import { RouterState, RouterStateSelector } from "Packages/Common/Domain/Router/Types";
import { select } from "redux-saga/effects";
import { getByRedirectInfluencedUrl } from "Packages/Common/Domain/Router/Query/UrlQuery";
import { HistoryManager } from "Packages/Common/Domain/Router";
import { OpenUrl } from "Packages/Common/Domain/Router/Command/OpenUrl";

export function* handleOpenUrl(
    routerStateSelector: RouterStateSelector,
    historyManager: HistoryManager,
    command: OpenUrl,
): Generator {
    // @ts-ignore
    const routerState: RouterState = yield select(routerStateSelector);
    const target = (!command.payload.target ? "_self" : command.payload.target);
    if (target !== "_self") {
        historyManager.openUrlInOtherTarget(command.payload.url, target);
        return;
    }
    const url = getByRedirectInfluencedUrl(routerState, command.payload.url);
    historyManager.changeCurrentUrl(url, !!command.payload.shouldReplaceCurrentUrl);
}
