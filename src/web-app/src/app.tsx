import React, { FC } from 'react';
import { History } from 'history';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { AuthContextProvider } from 'packages/common/authentication/ui';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ThemeProvider } from 'styled-components';
import { Toaster, Loader } from 'web-app/foundation/ui';
import { AppServices, authStateSelector, designStateSelector, translatorStateSelector } from 'web-app/services.factory';
import { TranslatorContextProvider } from 'packages/common/translator/ui';
import 'bootstrap/scss/bootstrap.scss';
import { Router } from 'web-app/app.routing';

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugins = [CSSPlugin]; // required to make sure CSSPlugin is not being dropped by webpack through tree shaking

const App: FC<{ history: History }> = (props) => {
    const translatorState = useSelector(translatorStateSelector);
    const authState = useSelector(authStateSelector);
    const designState = useSelector(designStateSelector);
    return (
        <ThemeProvider theme={designState.theme}>
            <TranslatorContextProvider value={translatorState}>
                <AuthContextProvider value={authState}>
                    <Router history={props.history} />
                    <Toaster />
                    <Loader />
                </AuthContextProvider>
            </TranslatorContextProvider>
        </ThemeProvider>
    );
};

export const RootComponent: FC<{ services: AppServices }> = (props) => (
    <StoreProvider store={props.services.store}>
        <App history={props.services.history} />
    </StoreProvider>
);
