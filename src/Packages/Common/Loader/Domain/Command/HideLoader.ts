import { LoaderCommandTypes } from "Packages/Common/Loader/Domain/Types";
import {Command} from "Packages/Common/CommonTypes";

export function createHideLoader(): HideLoader {
    return {
        type: LoaderCommandTypes.HIDE_LOADER,
        payload: undefined,
    };
}

export type HideLoader = Command<LoaderCommandTypes.HIDE_LOADER>;
