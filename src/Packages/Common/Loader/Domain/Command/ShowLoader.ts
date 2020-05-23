import { LoaderCommandTypes } from "Packages/Common/Loader/Domain/Types";
import {Command} from "Packages/Common/CommonTypes";

export function createShowLoader(): ShowLoader {
    return {
        type: LoaderCommandTypes.SHOW_LOADER,
        payload: undefined,
    };
}

export type ShowLoader = Command<LoaderCommandTypes.SHOW_LOADER>;
