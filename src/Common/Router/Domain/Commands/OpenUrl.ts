import {RouterCommandTypes} from "Common/Router/Domain/Router";
import {Command} from "Common/Bus/Domain/Command";
import {select, takeEvery} from "@redux-saga/core/effects";
import {RouterState, RouterStateSelector} from "Common/Router/Domain/Types";
import {getByRedirectInfluencedUrl} from "Common/Router/Domain/Query/UrlQuery";
import {HistoryManager} from "Common/Router/Domain/HistoryManager";

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