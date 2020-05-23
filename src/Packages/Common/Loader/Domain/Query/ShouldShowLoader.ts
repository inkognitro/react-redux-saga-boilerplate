import { LoaderState } from "../Types";

export function shouldShowLoader(state: LoaderState): boolean {
    return (state.loaderDemandCount > 0);
}
