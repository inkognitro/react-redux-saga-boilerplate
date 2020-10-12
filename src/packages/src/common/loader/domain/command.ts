import { Command } from 'packages/common/types/util/domain';

export enum LoaderCommandTypes {
    SHOW_LOADER = 'SHOW_LOADER-5359f800-ab47-427b-bcd3-990216cdffd7',
    HIDE_LOADER = 'HIDE_LOADER-5359f800-ab47-427b-bcd3-990216cdffd7',
}

export function createShowLoader(): ShowLoader {
    return {
        type: LoaderCommandTypes.SHOW_LOADER,
        payload: undefined,
    };
}

export type ShowLoader = Command<LoaderCommandTypes.SHOW_LOADER>;

export function createHideLoader(): HideLoader {
    return {
        type: LoaderCommandTypes.HIDE_LOADER,
        payload: undefined,
    };
}

export type HideLoader = Command<LoaderCommandTypes.HIDE_LOADER>;
