import React, {Component} from 'react';
import {FunctionalLink, RouterLink} from 'Common/Layout/UI/Link/Link';
import {ToastTypes} from "Common/Toaster/Domain/Types";
import {Dispatch} from "redux";
import {createShowMessage} from "Common/Toaster/Domain/Command/ShowMessage";
import {connect} from "react-redux";
import {RootState} from "SinglePageApp/Bootstrap/AppServicesFactory";
import {HomeState} from "SinglePageApp/Routing/Domain/Home/Types";
import {RouteComponent} from "Common/Router/UI/Router";
import {homeRoute} from "SinglePageApp/Routing/Domain/Home/Home";
import {ContentPage} from "SinglePageApp/Layout/UI/PageTypes/ContentPage";
import {createLeakReduxState} from "SinglePageApp/Routing/Domain/Home/Command/LeakReduxState";
import {TextField, TextFieldTypes} from "Common/Layout/UI/Form/TextField";
import {createChangePartialState} from "SinglePageApp/Routing/Domain/Home/Command/ChangePartialState";
import {FormGroup} from "Common/Layout/UI/Form/FormGroup";
import {Label} from "Common/Layout/UI/Form/Label";
import {createLogin} from "Common/AuthenticationWIP/Domain/Command/Login";

type HomeCallbacks = {
    onClickLogin: () => void,
    onAddToast: (type: ToastTypes, content: string) => void,
    onClickLeakReduxState: () => void,
    onChangeState: (state: Partial<HomeState>) => void,
};

type HomeProps = (HomeState & HomeCallbacks);
class Home extends Component<HomeProps> {
    render() {
        return (
            <ContentPage>
                <h1>Features</h1>

                <br />

                <br />
                <h3>Routing</h3>
                <div>
                    <RouterLink url="/some-page-which-does-not-exist">
                        go to non existing page
                    </RouterLink>
                </div>

                <br />
                <h3>Authentication</h3>
                <FunctionalLink onClick={this.props.onClickLogin}>
                    Login
                </FunctionalLink>
                <br />

                <br />
                <h3>Toasts</h3>
                <div><FunctionalLink onClick={() => this.props.onAddToast(ToastTypes.SUCCESS, this.props.toastContent)}>add a success toast message</FunctionalLink> (is being closed after 3 seconds)</div>
                <div><FunctionalLink onClick={() => this.props.onAddToast(ToastTypes.INFO, this.props.toastContent)}>add an info toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.props.onAddToast(ToastTypes.WARNING, this.props.toastContent)}>add a warning toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.props.onAddToast(ToastTypes.ERROR, this.props.toastContent)}>add an error toast message</FunctionalLink></div>

                <br />
                <FormGroup>
                    <Label title={'Toast content: ' + this.props.toastContent} formElementId="toastContentTextField" />
                    <TextField
                        id="toastContentTextField"
                        type={TextFieldTypes.TEXT}
                        value={this.props.toastContent}
                        onChange={(text) => this.props.onChangeState({toastContent: text})}
                    />
                </FormGroup>

                <br />
                <h3>Redux</h3>
                <div><FunctionalLink onClick={this.props.onClickLeakReduxState}>leak redux state in console</FunctionalLink></div>
            </ContentPage>
        );
    }
}

const mapStateToProps = (state: RootState): HomeState => {
    return state.routing.home;
};

const mapDispatchToProps = (dispatch: Dispatch): HomeCallbacks => {
    return {
        onClickLogin: () => dispatch(createLogin({
            username: 'sonGoku',
            password: '1234',
            shouldRemember: false,
        })),
        onAddToast: (type: ToastTypes, content: string) => dispatch(createShowMessage({
            content: content,
            toastType: type,
        })),
        onClickLeakReduxState: () => dispatch(createLeakReduxState()),
        onChangeState: (state: Partial<HomeState>) => dispatch(createChangePartialState(state)),
    };
};

export const homeRouteComponent: RouteComponent = {
    route: homeRoute,
    component: connect(mapStateToProps, mapDispatchToProps)(Home),
};