import { HttpApiV1State } from './types';

export function getBaseUrl(state: HttpApiV1State): string {
    return state.baseUrl;
}
