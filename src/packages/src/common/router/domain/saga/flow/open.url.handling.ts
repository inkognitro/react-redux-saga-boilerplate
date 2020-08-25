import { select } from "redux-saga/effects";
import { RouterState, RouterStateSelector, HistoryManager } from "../../types";
import { OpenUrl } from "../../command";
import { getByRedirectInfluencedUrl } from "../../query";

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
    if (target === '_self' && historyManager.getCurrentUrl() === command.payload.url) {
        return;
    }
    const url = getByRedirectInfluencedUrl(routerState, command.payload.url);
    historyManager.changeCurrentUrl(url, !!command.payload.shouldReplaceCurrentUrl);
}
