import { Event } from "packages/entity/common-types";
import { LoaderEventTypes } from "./Types";

export function createLoaderWasWithdrawn(): LoaderWasWithdrawn {
    return {
        type: LoaderEventTypes.LOADER_WAS_WITHDRAWN,
        payload: undefined,
    };
}

export type LoaderWasWithdrawn = Event<LoaderEventTypes.LOADER_WAS_WITHDRAWN>
