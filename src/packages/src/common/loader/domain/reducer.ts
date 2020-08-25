import { LoaderState } from "./types";
import { LoaderEventTypes, LoaderWasDemanded, LoaderWasWithdrawn } from "./event";

type LoaderEvent = (LoaderWasDemanded | LoaderWasWithdrawn);

const initialLoaderState: LoaderState = {
    loaderDemandCount: 0,
};

export function loaderReducer(state: LoaderState = initialLoaderState, event?: LoaderEvent): LoaderState {
    if (!event) {
        return state;
    }
    if (event.type === LoaderEventTypes.LOADER_WAS_DEMANDED) {
        return {
            ...state,
            loaderDemandCount: (state.loaderDemandCount + 1),
        };
    }
    if (event.type === LoaderEventTypes.LOADER_WAS_WITHDRAWN) {
        return {
            ...state,
            loaderDemandCount: (state.loaderDemandCount - 1),
        };
    }
    return state;
}
