import { Event } from "Packages/Entity/CommonTypes";
import { LoaderEventTypes } from "../Types";

export function createLoaderWasDemanded(): LoaderWasDemanded {
    return {
        type: LoaderEventTypes.LOADER_WAS_DEMANDED,
        payload: undefined,
    };
}

export type LoaderWasDemanded = Event<LoaderEventTypes.LOADER_WAS_DEMANDED>
