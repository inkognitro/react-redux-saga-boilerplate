import {
    LoaderState as LoaderStateType,
    LoaderEvent as LoaderEventType,
} from './Domain/Types';
import { HideLoader as HideLoaderType } from './Domain/Command/HideLoader';
import { ShowLoader as ShowLoaderType } from './Domain/Command/ShowLoader';
import { LoaderWasWithdrawn as LoaderWasWithdrawnType } from './Domain/Event/LoaderWasWithdrawn';
import { LoaderWasDemanded as LoaderWasDemandedType } from './Domain/Event/LoaderWasDemanded';

export type LoaderState = LoaderStateType;
export type LoaderEvent = LoaderEventType;
export type HideLoader = HideLoaderType;
export type ShowLoader = ShowLoaderType;
export type LoaderWasWithdrawn = LoaderWasWithdrawnType;
export type LoaderWasDemanded = LoaderWasDemandedType;

export { LoaderCommandTypes, LoaderEventTypes } from './Domain/Types';
export { createLoaderSaga } from './Domain/Saga/Flow';
export { createHideLoader } from './Domain/Command/HideLoader';
export { createShowLoader } from './Domain/Command/ShowLoader';
export { loaderReducer } from './Domain/Reducer';
export { LoaderWC } from './UI/LoaderWC';
