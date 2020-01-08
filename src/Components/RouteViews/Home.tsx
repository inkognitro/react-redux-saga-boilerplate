import React from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {FunctionalLink, Link} from 'App/Components/Common/Link/containers/Link';
import {store} from "App/Redux/root";
import {addToastMessage} from "App/Redux/Toaster/actions";
import {ToastTypes} from "App/Redux/Toaster/types";

export class Home extends React.Component {
    addToast(type: ToastTypes) {
        // @ts-ignore
        store.dispatch(addToastMessage({
            type: type,
            content: 'foo',
        }));
    }

    render() {
        return (
            <ContentPage>
                <h1>Features</h1>

                <br />
                <h3>Routing</h3>
                <Link url="/some-page-which-does-not-exist">go to non existing page</Link>

                <br /><br />
                <h3>Toasts</h3>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.INFO)}>add an info toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.SUCCESS)}>add a success toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.WARNING)}>add a warning toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.ERROR)}>add an error toast message</FunctionalLink></div>

            </ContentPage>
        );
    }
}