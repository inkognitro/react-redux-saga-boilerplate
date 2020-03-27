import React, {Component} from 'react';
import {FunctionalLink, RouterLink} from 'Common/Layout/UI/Link/Link';
import {ToastTypes} from "Common/Toaster/Domain/Types";
import {Dispatch} from "redux";
import {createAddToastMessageAction} from "Common/Toaster/Domain/Command/AddToastMessage";
import {connect} from "react-redux";
import {RootState} from "SinglePageApp/AppBase/Store";
import {HomeState} from "SinglePageApp/Routing/Home/Domain/Types";

type HomeComponentState = (HomeState & {
    reduxState: RootState
});

type HomeComponentCallbacks = {
    onAddToast: (type: ToastTypes) => void,
};

type HomeProps = (
    HomeComponentCallbacks
    & HomeComponentState
);

class PresentationalHome extends Component<HomeProps> {
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

const mapStateToProps = (state: RootState<HomeState>): HomeComponentState => {
    return {
        ...state.routing.currentRouteData,
        reduxState: state,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): HomeComponentCallbacks => {
    return {
        onAddToast: (type: ToastTypes) => dispatch(createAddToastMessageAction({
            content: 'foo',
            type: type
        })),
    };
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(PresentationalHome);