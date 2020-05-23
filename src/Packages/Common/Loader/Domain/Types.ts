import { LoaderWasDemanded, LoaderWasWithdrawn } from "Packages/Common/Loader";

export enum LoaderEventTypes {
    LOADER_WAS_DEMANDED = "LOADER_WAS_DEMANDED-5359f800-ab47-427b-bcd3-990216cdffd7",
    LOADER_WAS_WITHDRAWN = "LOADER_WAS_WITHDRAWN-5359f800-ab47-427b-bcd3-990216cdffd7",
}

export type LoaderEvent = (LoaderWasDemanded | LoaderWasWithdrawn);

export type LoaderState = {
    loaderDemandCount: number
};

export type LoaderStateSelector<State = any> = (state: State) => LoaderState;

export enum LoaderCommandTypes {
    SHOW_LOADER = "SHOW_LOADER-5359f800-ab47-427b-bcd3-990216cdffd7",
    HIDE_LOADER = "HIDE_LOADER-5359f800-ab47-427b-bcd3-990216cdffd7",
}
