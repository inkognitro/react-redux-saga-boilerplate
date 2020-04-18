import React, {FC} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {Store} from 'redux';
import {History} from 'history';
import 'bootstrap/scss/bootstrap.scss';
import {ThemedApp} from "SinglePageApp/UI/ThemedApp";
import {Theme} from "Common/Domain/Design/Types";
import {getDefaultTheme} from "Common/Domain/Design/Query/ThemeQuery";

export type RootComponentProps = {
    store: Store,
    history: History
};

export const RootComponent: FC<RootComponentProps> = (props) => {
    return (
        <StoreProvider store={props.store}>
            <ThemedApp history={props.history} />
        </StoreProvider>
    );
};

export function getTheme(componentProps?: any): Theme {
    if(!componentProps || typeof componentProps !== 'object' || !componentProps.theme) {
        return getDefaultTheme();
    }
    return componentProps.theme;
}