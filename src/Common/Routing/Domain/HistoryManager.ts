export interface HistoryManager {
    getCurrentUrl(): string
    openUrlInTarget(url: string, target: string): void
    changeCurrentUrl(url: string, replaceCurrentUrl: boolean): void
    setOnChangeUrlCallback(onChangeUrlCallback: OnChangeUrlCallback): void
}

export type OnChangeUrlCallback = (url: string) => void;