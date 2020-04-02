import {Redirect} from "Common/Router/Domain/Types";
import {HistoryManager} from "Common/Router/Domain/HistoryManager";
import {EventBus} from "Common/Bootstrap/EventBus";
import {createCurrentUrlWasChanged} from "Common/Router/Domain/Event/CurrentUrlWasChanged";
import {ByRedirectInfluencedUrlQuery} from "Common/Router/Domain/Query/UrlQuery";
import {createRedirectWasAdded} from "Common/Router/Domain/Event/RedirectsWereAdded";
import {OpenUrlSettings} from "Common/Router/Domain/Commands/OpenUrl";

export class RouterOld {
    private readonly eventBus: EventBus;
    private readonly byRedirectInfluencedUrlQuery: ByRedirectInfluencedUrlQuery;
    private readonly historyManager: HistoryManager;

    constructor(
        eventBus: EventBus,
        byRedirectInfluencedUrlQuery: ByRedirectInfluencedUrlQuery,
        historyManager: HistoryManager
    ) {
        this.eventBus = eventBus;
        this.byRedirectInfluencedUrlQuery = byRedirectInfluencedUrlQuery;
        this.historyManager = historyManager;
        this.setOnChangeUrlCallback();
    }

    private setOnChangeUrlCallback(): void {
        const mustTriggerHistoryManager = false;
        const onChangeUrlCallback = (url: string) => this.openUrl({
            url: url,
            target: '_self',
            shouldReplaceCurrentUrl: false
        }, mustTriggerHistoryManager);
        this.historyManager.setOnChangeUrlCallback(onChangeUrlCallback);
    }

    public openUrl(settings: OpenUrlSettings, mustTriggerHistoryManager: boolean = true): void
    {
        const urlToUse = this.byRedirectInfluencedUrlQuery.get(settings.url);
        const target = (!settings.target ? '_self' : settings.target);
        if(mustTriggerHistoryManager && target === '_self') {
            this.historyManager.changeCurrentUrl(urlToUse, !!settings.shouldReplaceCurrentUrl);
        }
        if(mustTriggerHistoryManager && target !== '_self') {
            this.historyManager.openUrlInTarget(urlToUse, target);
        }
        if(target === '_self') {
            this.eventBus.handle(createCurrentUrlWasChanged(urlToUse));
        }
    }

    public addRedirect(redirect: Redirect): void
    {
        this.eventBus.handle(createRedirectWasAdded(redirect));
    }
}

