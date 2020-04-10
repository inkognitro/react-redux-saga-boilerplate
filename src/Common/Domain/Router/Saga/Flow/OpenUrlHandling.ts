import {RouterCommandTypes, RouterState, RouterStateSelector} from "Common/Domain/Router/Types";
import {HistoryManager} from "Common/Domain/Router/HistoryManager";
import {select, takeEvery} from "@redux-saga/core/effects";
import {getByRedirectInfluencedUrl} from "Common/Domain/Router/Query/UrlQuery";
import {OpenUrl} from "Common/Domain/Router/Commands/OpenUrl";

export function createWatchOpenUrlFlow(
    routerStateSelector: RouterStateSelector,
    historyManager: HistoryManager
): GeneratorFunction {
    const handleOpenUrl = function* (command: OpenUrl): Generator {
        //@ts-ignore
        const routerState: RouterState = yield select(routerStateSelector);
        const target = (!command.payload.target ? '_self' : command.payload.target);
        if (target !== '_self') {
            historyManager.openUrlInOtherTarget(command.payload.url, target);
            return;
        }
        const url = getByRedirectInfluencedUrl(routerState, command.payload.url);
        historyManager.changeCurrentUrl(url, !!command.payload.shouldReplaceCurrentUrl);
    };

    return <GeneratorFunction>function* (): Generator {
        yield takeEvery(RouterCommandTypes.OPEN_URL, handleOpenUrl);
    }
}