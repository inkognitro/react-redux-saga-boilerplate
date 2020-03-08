import React, {Component} from 'react';
import {FunctionalLink, Link} from 'Common/Layout/UI/Link/Link';
import {ToastTypes} from "Common/Toaster/Domain/Types";
import {Store} from "redux";
import {createAddToastMessageCommandAction} from "Common/Toaster/Domain/Command/AddToastMessage";

export type HomeProps = {
    store: Store,
};

export class Home extends Component<HomeProps> { //connect component directly with redux store!
    addToast(type: ToastTypes) {
        this.props.store.dispatch(createAddToastMessageCommandAction({
            content: 'foo',
            type: type
        }));
    }

    render() {
        return (
            <div>
                <h1>Features</h1>

                <br />
                <h3>Routing</h3>
                <div>
                    <Link url="/some-page-which-does-not-exist">
                        go to non existing page
                    </Link>
                </div>

                <br />
                <h3>Login</h3>

                <br />
                <h3>Toasts</h3>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.INFO)}>add an info toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.SUCCESS)}>add a success toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.WARNING)}>add a warning toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.ERROR)}>add an error toast message</FunctionalLink></div>

                <br />
                <h3>Redux</h3>
                <div><FunctionalLink onClick={() => console.log(this.props.store.getState())}>print redux state</FunctionalLink></div>
            </div>
        );
    }
}