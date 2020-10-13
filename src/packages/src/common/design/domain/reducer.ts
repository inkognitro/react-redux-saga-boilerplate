import { Reducer } from 'redux';
import { DesignState } from './types';
import { getDefaultTheme } from './query';

const initialDesignState: DesignState = {
    theme: getDefaultTheme(),
};

export const designReducer: Reducer<DesignState> = (state = initialDesignState) => state;
