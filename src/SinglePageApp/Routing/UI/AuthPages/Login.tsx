import React from 'react';
import {ContentPage} from 'SinglePageApp/Layout/UI/PageTypes/ContentPage';
import {store} from "SinglePageApp/App";
import {PrimaryButton} from "Common/Layout/UI/Form/Buttons/PrimaryButton";
import {TextField, TextFieldTypes} from "Common/Layout/UI/Form/InputElements/TextField";
import {Card} from "Common/Layout/UI/Card/Card";
import {Link} from "Common/Layout/UI/Link/Link";
import {createPasswordForgottenUrl} from "SinglePageApp/Routing/Domain/RouteFactory";
import {createAuthenticateThunk} from "Common/Auth/Domain/AuthManager";

export class Login extends React.Component {
    login() {
        //@ts-ignore
        store.dispatch(createAuthenticateThunk('foo', 'bar', true));
    }

    render() {
        return (
            <ContentPage topDividedContent={true}>
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <Card title="Login">
                        <div className="card-text">
                            <TextField label="Username" placeholder="e.g. songoku" errorMessage="wrong foo!" />
                            <TextField label="Password" type={TextFieldTypes.PASSWORD} />
                            <PrimaryButton onClick={() => this.login()}>Login</PrimaryButton>
                        </div>
                        <div className="card-text text-right">
                            <small className="text-muted">
                                <Link url={createPasswordForgottenUrl()}>
                                    Did you forget your password?
                                </Link>
                            </small>
                        </div>
                    </Card>
                </div>
            </ContentPage>
        );
    }
}