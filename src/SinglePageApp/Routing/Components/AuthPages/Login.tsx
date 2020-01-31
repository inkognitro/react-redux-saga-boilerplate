import React from 'react';
import {ContentPage} from 'SinglePageApp/Layout/Components/PageTypes/ContentPage';
import {authenticate} from "Common/Application/Auth/Redux/Actions";
import {store} from "SinglePageApp/App";
import {PrimaryButton} from "Common/Application/Layout/Components/Form/Buttons/PrimaryButton";
import {TextField, TextFieldTypes} from "Common/Application/Layout/Components/Form/InputElements/TextField";
import {Card} from "Common/Application/Layout/Components/Card/Card";
import {Link} from "Common/Application/Layout/Components/Link/Link";
import {createPasswordForgottenUrl} from "SinglePageApp/Routing/RouteFactory";

export class Login extends React.Component {
    login() {
        //@ts-ignore
        store.dispatch(authenticate('foo', 'bar', true));
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