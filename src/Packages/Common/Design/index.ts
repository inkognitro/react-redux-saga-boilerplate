import {
    DesignState as DesignStateType,
    Theme as ThemeType,
} from './Domain/Types';
import { StyledWCProps as StyledWCPropsType } from './UI/Types';

export type DesignState = DesignStateType;
export type Theme = ThemeType;
export type StyledWCProps = StyledWCPropsType;

export { getTheme, getDefaultTheme } from './Domain/Query/ThemeQuery';
export { designReducer } from './Domain/Reducer';
export { createBoxShadowCss } from './UI/WCStyleFactory';
