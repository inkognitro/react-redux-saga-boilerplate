import { LoaderEventTypes } from "Packages/Common/Loader/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createLoaderWasDemanded(): LoaderWasDemanded {
    return {
        type: LoaderEventTypes.LOADER_WAS_DEMANDED,
        payload: undefined,
    };
}

export type LoaderWasDemanded = Event<LoaderEventTypes.LOADER_WAS_DEMANDED>
