import React from 'react';
import {ContentPage} from 'SinglePageApp/Layout/UI/PageTypes/ContentPage';
import {store} from "SinglePageApp/App";
import {PrimaryButton} from "Common/Layout/UI/Form/Buttons/PrimaryButton";
import {TextField, TextFieldTypes} from "Common/Layout/UI/Form/InputElements/TextField";
import {Card} from "Common/Layout/UI/Card/Card";
import {Link} from "Common/Layout/UI/Link/Link";
import {createPasswordForgottenUrl} from "SinglePageApp/Routing/Domain/RouteCreation";
import {AuthManager} from "Common/Auth/Domain/AuthManager";
import {UserRepository} from "Common/EntityCache/Domain/User/UserRepository";
import {BrowserCookieStorage} from "Common/CookieHandling/Infrastructure/BrowserCookieStorage";
import {ApiAuthBackendService} from "Common/Auth/Infrastructure/ApiAuthBackendService";
import {ApiHttpRequestManager} from "Common/RequestHandling/Domain/ApiHttpRequestManager";
import {HttpRequestManager} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";
import {ToastRepository} from "Common/Toaster/Domain/ToastRepository";
import {AxiosRequestDispatcher} from "Common/RequestHandling/Infrastructure/AxiosRequestDispatcher";

export class Login extends React.Component {
    private readonly authManager: AuthManager;

    constructor(props: object) {
        super(props);
        const browserCookieStorage = new BrowserCookieStorage();
        const userRepository = new UserRepository(store.dispatch, () => store.getState().cache.userRepository);
        const toastRepository = new ToastRepository(store.dispatch, () => store.getState().toaster);
        const httpRequestManager = new HttpRequestManager(
            () => store.getState().requestHandling,
            store.dispatch,
            new AxiosRequestDispatcher()
        );
        const apiHttpRequestManager = new ApiHttpRequestManager(httpRequestManager, toastRepository);
        this.authManager = new AuthManager(
            store.dispatch,
            () => store.getState().auth,
            userRepository,
            browserCookieStorage,
            new ApiAuthBackendService(apiHttpRequestManager)
        );
    }

    login() {
        this.authManager.authenticate({
            shouldRemember: false,
            isLoaderEnabled: true,
            username: 'foo',
            password: 'bar',
        });
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