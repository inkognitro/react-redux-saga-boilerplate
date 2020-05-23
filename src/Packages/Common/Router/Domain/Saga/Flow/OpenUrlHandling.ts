import { select } from "redux-saga/effects";
import { HistoryManager } from "Packages/Common/Router";
import { RouterState, RouterStateSelector } from "../../Types";
import { getByRedirectInfluencedUrl } from "../../Query/UrlQuery";
import { OpenUrl } from "../../Command/OpenUrl";

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
