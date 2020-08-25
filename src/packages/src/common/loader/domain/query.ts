import { LoaderState } from './types';

export function shouldShowLoader(state: LoaderState): boolean {
    return (state.loaderDemandCount > 0);
}
