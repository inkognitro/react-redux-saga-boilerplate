import { Event } from "Common/Domain/Bus/Event";
import { LoaderEventTypes } from "Common/Domain/Loader/Types";

export function createLoaderWasDemanded(): LoaderWasDemanded {
    return {
        type: LoaderEventTypes.LOADER_WAS_DEMANDED,
        payload: undefined,
    };
}

export type LoaderWasDemanded = Event<LoaderEventTypes.LOADER_WAS_DEMANDED>
