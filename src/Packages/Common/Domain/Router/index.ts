export interface HistoryManager {
    getCurrentUrl(): string
    openUrlInOtherTarget(url: string, target: string): void
    changeCurrentUrl(url: string, replaceCurrentUrl: boolean): void
    getOnChangeCurrentUrlPromise(): Promise<string>
}

export { createRouterSaga } from './Saga/Flow';
export { createExtendRouter, ExtendRouter } from './Command/ExtendRouter';
export { createOpenUrl, OpenUrl } from './Command/OpenUrl';
export { CurrentUrlWasChanged } from './Event/CurrentUrlWasChanged';
export { RouterWasExtended } from './Event/RouterWasExtended';
export { RouterWasInitialized } from './Event/RouterWasInitialized';
