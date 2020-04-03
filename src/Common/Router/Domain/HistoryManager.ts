export interface HistoryManager {
    getCurrentUrl(): string
    openUrlInOtherTarget(url: string, target: string): void
    changeCurrentUrl(url: string, replaceCurrentUrl: boolean): void
    getOnChangeCurrentUrlPromise(): Promise<string>
}

export type OnChangeUrlCallback = (url: string) => void;