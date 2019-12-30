import React from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {FunctionalLink} from 'App/Components/Common/Link/containers/Link';
import {authenticate} from "App/Redux/Auth/actions";
import {store} from "App/Redux/root";

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