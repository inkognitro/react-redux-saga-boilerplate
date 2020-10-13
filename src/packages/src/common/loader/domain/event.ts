import { Event } from 'packages/common/types/util/domain';

export enum LoaderEventTypes {
    LOADER_WAS_DEMANDED = 'LOADER_WAS_DEMANDED-5359f800-ab47-427b-bcd3-990216cdffd7',
    LOADER_WAS_WITHDRAWN = 'LOADER_WAS_WITHDRAWN-5359f800-ab47-427b-bcd3-990216cdffd7',
}

export function createLoaderWasDemanded(): LoaderWasDemanded {
    return {
        type: LoaderEventTypes.LOADER_WAS_DEMANDED,
        payload: undefined,
    };
}

export type LoaderWasDemanded = Event<LoaderEventTypes.LOADER_WAS_DEMANDED>;

export function createLoaderWasWithdrawn(): LoaderWasWithdrawn {
    return {
        type: LoaderEventTypes.LOADER_WAS_WITHDRAWN,
        payload: undefined,
    };
}

export type LoaderWasWithdrawn = Event<LoaderEventTypes.LOADER_WAS_WITHDRAWN>;
