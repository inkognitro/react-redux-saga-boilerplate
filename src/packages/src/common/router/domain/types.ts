export type RouterState = {
    redirects: Redirect[];
};

export type Redirect = {
    fromRoute: Route;
    toUrl: string;
};

export type Route = {
    urlSchema: string;
    urlMustMatchExactly: boolean;
};

export interface HistoryManager {
    getCurrentUrl(): string
    openUrlInOtherTarget(url: string, target: string): void
    changeCurrentUrl(url: string, replaceCurrentUrl: boolean): void
    getOnChangeCurrentUrlPromise(): Promise<string>
}

export type RouterStateSelector<State = any> = (state: State) => RouterState;
