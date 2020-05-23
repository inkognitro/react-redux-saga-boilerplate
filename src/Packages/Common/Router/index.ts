export interface HistoryManager {
    getCurrentUrl(): string
    openUrlInOtherTarget(url: string, target: string): void
    changeCurrentUrl(url: string, replaceCurrentUrl: boolean): void
    getOnChangeCurrentUrlPromise(): Promise<string>
}
export { createRouterSaga } from './Domain/Saga/Flow';
export { createExtendRouter, ExtendRouter } from './Domain/Command/ExtendRouter';
export { createOpenUrl, OpenUrl } from './Domain/Command/OpenUrl';
export { CurrentUrlWasChanged } from './Domain/Event/CurrentUrlWasChanged';
export { RouterWasExtended } from './Domain/Event/RouterWasExtended';
export { RouterWasInitialized } from './Domain/Event/RouterWasInitialized';
export * from './Domain/Types';
export * from './UI/LinkWC';
export * from './UI/RouterWC';
