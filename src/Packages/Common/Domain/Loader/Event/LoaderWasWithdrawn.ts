import { Event } from "Packages/Common/Domain/Bus/Event";
import { LoaderEventTypes } from "Packages/Common/Domain/Loader/Types";

export function createLoaderWasWithdrawn(): LoaderWasWithdrawn {
    return {
        type: LoaderEventTypes.LOADER_WAS_WITHDRAWN,
        payload: undefined,
    };
}

export type LoaderWasWithdrawn = Event<LoaderEventTypes.LOADER_WAS_WITHDRAWN>
