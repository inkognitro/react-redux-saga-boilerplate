import { LoaderState } from "Packages/Common/Domain/Loader/Types";

export function shouldShowLoader(state: LoaderState): boolean {
    return (state.loaderDemandCount > 0);
}
