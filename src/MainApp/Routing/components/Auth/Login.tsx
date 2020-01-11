import React from 'react';
import {ContentPage} from 'MainApp/Layout/PageTypes/ContentPage';
import {FunctionalLink} from 'Common/Layout/components/Link/Link';
import {authenticate} from "Common/Auth/redux/actions";
import {store} from "MainApp/App";

export class Login extends React.Component {
    login() {
        //@ts-ignore
        store.dispatch(authenticate('foo', 'bar', true));
    }

    render() {
        return (
            <ContentPage>
                <h1>Login</h1>
                <FunctionalLink onClick={() => this.login()}>
                    simulate login
                </FunctionalLink>
            </ContentPage>
        );
    }
}