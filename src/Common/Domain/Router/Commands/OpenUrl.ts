import {RouterCommandTypes} from "Common/Domain/Router/Router";
import {Command} from "Common/Domain/Bus/Command";
import {select, takeEvery} from "@redux-saga/core/effects";
import {RouterState, RouterStateSelector} from "Common/Domain/Router/Types";
import {getByRedirectInfluencedUrl} from "Common/Domain/Router/Query/UrlQuery";
import {HistoryManager} from "Common/Domain/Router/HistoryManager";

export function createWatchOpenUrlSaga(
    routerStateSelector: RouterStateSelector,
    historyManager: HistoryManager
): GeneratorFunction {
    const handleOpenUrl = function* (command: OpenUrl): Generator {
        //@ts-ignore
        const routerState: RouterState = yield select(routerStateSelector);
        const target = (!command.payload.target ? '_self' : command.payload.target);
        if(target !== '_self') {
            historyManager.openUrlInOtherTarget(command.payload.url, target);
            return;
        }
        const url = getByRedirectInfluencedUrl(routerState, command.payload.url);
        historyManager.changeCurrentUrl(url, !!command.payload.shouldReplaceCurrentUrl);
    };

    return <GeneratorFunction>function* watchOpenUrlSaga(): Generator {
        yield takeEvery(RouterCommandTypes.OPEN_URL, handleOpenUrl);
    }
}

export function createOpenUrl(settings: OpenUrlSettings): OpenUrl {
    return {
        type: RouterCommandTypes.OPEN_URL,
        payload: settings
    };
}

export type OpenUrl = Command<RouterCommandTypes.OPEN_URL, OpenUrlSettings>;

type OpenUrlSettings = {
    url: string,
    target?: string,
    shouldReplaceCurrentUrl?: boolean,
};