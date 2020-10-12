import {
    DesignStateSelector as DesignStateSelectorType,
    DesignState as DesignStateType,
    Theme as ThemeType,
} from './types';

export type DesignState = DesignStateType;
export type DesignStateSelector = DesignStateSelectorType;
export type Theme = ThemeType;

export { designReducer } from './reducer';
export { getDefaultTheme } from './query';
export { getTheme } from './query';
