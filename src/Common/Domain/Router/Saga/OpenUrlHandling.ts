import { RouterState, RouterStateSelector } from "Common/Domain/Router/Types";
import { HistoryManager } from "Common/Domain/Router/HistoryManager";
import { select } from "redux-saga/effects";
import { getByRedirectInfluencedUrl } from "Common/Domain/Router/Query/UrlQuery";
import { OpenUrl } from "Common/Domain/Router/Commands/OpenUrl";

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
