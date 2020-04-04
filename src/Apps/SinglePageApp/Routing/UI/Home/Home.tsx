import React, {Component} from 'react';
import {FunctionalLink, RouterLink} from 'Common/Layout/UI/Link/Link';
import {ToastTypes} from "Common/Toaster/Domain/Types";
import {Dispatch} from "redux";
import {createShowMessage} from "Common/Toaster/Domain/Command/ShowMessage";
import {connect} from "react-redux";
import {RootState} from "SinglePageApp/Bootstrap/Store";
import {HomeState} from "SinglePageApp/Routing/Domain/Home/Types";
import {RouteComponent} from "Common/Router/UI/Router";
import {homeRoute} from "SinglePageApp/Routing/Domain/Home/Home";

type HomeComponentState = (HomeState & {
    reduxState: RootState
});

type HomeComponentCallbacks = {
    onAddToast: (type: ToastTypes) => void,
};

type HomeProps = (HomeComponentCallbacks & HomeComponentState);
class Home extends Component<HomeProps> {
    render() {
        return (
            <div>
                <h1>Features</h1>

                <br />
                foo: {this.props.foo}

                <br />
                <h3>Routing</h3>
                <div>
                    <RouterLink url="/some-page-which-does-not-exist">
                        go to non existing page
                    </RouterLink>
                </div>

                <br />
                <h3>Login</h3>

                <br />
                <h3>Toasts</h3>
                <div><FunctionalLink onClick={() => this.props.onAddToast(ToastTypes.INFO)}>add an info toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.props.onAddToast(ToastTypes.SUCCESS)}>add a success toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.props.onAddToast(ToastTypes.WARNING)}>add a warning toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.props.onAddToast(ToastTypes.ERROR)}>add an error toast message</FunctionalLink></div>

                <br />
                <h3>Redux</h3>
                <div><FunctionalLink onClick={() => console.log(this.props.reduxState)}>print redux state</FunctionalLink></div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): HomeComponentState => {
    return {
        ...state.routing,
        reduxState: state,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): HomeComponentCallbacks => {
    return {
        onAddToast: (type: ToastTypes) => dispatch(createShowMessage({
            content: 'foo',
            toastType: type,
        })),
    };
};

export const homeRouteComponent: RouteComponent = {
    route: homeRoute,
    component: connect(mapStateToProps, mapDispatchToProps)(Home),
};