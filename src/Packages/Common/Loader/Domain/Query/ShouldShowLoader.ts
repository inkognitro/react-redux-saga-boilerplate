import { LoaderState } from "Packages/Common/Loader/Domain/Types";

export function shouldShowLoader(state: LoaderState): boolean {
    return (state.loaderDemandCount > 0);
}
