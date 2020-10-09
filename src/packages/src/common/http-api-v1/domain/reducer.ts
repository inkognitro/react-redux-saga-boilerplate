import { Reducer } from 'redux';
import { HttpApiV1State } from "./types";
import { HttpApiV1WasInitialized, HttpApiV1EventTypes } from './event';

const initialState: HttpApiV1State = {
    baseUrl: '',
};

export const httpApiV1Reducer: Reducer<HttpApiV1State> = (state = initialState, action) => {
    if (!action) {
        return state;
    }
    if (action.type === HttpApiV1EventTypes.HTTP_API_V1_WAS_INITIALIZED) {
        // @ts-ignore
        const event: HttpApiV1WasInitialized = action;
        return {
            ...state,
            baseUrl: event.payload.baseUrl,
        }
    }
    return state;
};
