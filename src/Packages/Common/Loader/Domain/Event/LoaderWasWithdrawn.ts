import { LoaderEventTypes } from "Packages/Common/Loader/Domain/Types";
import {Event} from "Packages/Common/CommonTypes";

export function createLoaderWasWithdrawn(): LoaderWasWithdrawn {
    return {
        type: LoaderEventTypes.LOADER_WAS_WITHDRAWN,
        payload: undefined,
    };
}

export type LoaderWasWithdrawn = Event<LoaderEventTypes.LOADER_WAS_WITHDRAWN>
