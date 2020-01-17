import React from 'react';
import {ContentPage} from 'MainApp/Layout/Components/PageTypes/ContentPage';
import {authenticate} from "Common/Auth/Redux/Actions";
import {store} from "MainApp/App";
import {PrimaryButton} from "Common/Layout/Components/Form/Buttons/PrimaryButton";
import {TextField, TextFieldTypes} from "Common/Layout/Components/Form/InputElements/TextField";

export class Login extends React.Component {
    login() {
        //@ts-ignore
        store.dispatch(authenticate('foo', 'bar', true));
    }

    render() {
        return (
            <ContentPage>
                <h1>Login</h1>
                <TextField label="Username" placeholder="e.g. songoku" />
                <TextField label="Password" type={TextFieldTypes.PASSWORD} />
                <PrimaryButton onClick={() => this.login()}>
                    Login
                </PrimaryButton>
            </ContentPage>
        );
    }
}