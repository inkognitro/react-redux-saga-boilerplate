import React from 'react';
import {ContentPage} from 'MainApp/Layout/Components/PageTypes/ContentPage';
import {FunctionalLink, Link} from 'Common/Layout/Components/Link/Link';
import {addToastMessage} from "Common/Layout/Redux/Toaster/Actions";
import {ToastTypes} from "Common/Layout/Redux/Toaster/Types";
import {store} from "MainApp/App";
import {createUtcNowDateTimeString, getDateMinusNowInSeconds} from "Common/Utility/DateTimeHandling";

export class Home extends React.Component {
    addToast(type: ToastTypes) {
        // @ts-ignore
        store.dispatch(addToastMessage({
            type: type,
            content: 'foo',
        }));
    }

    render() {
        console.log('createNowDateString()');
        console.log(createUtcNowDateTimeString());

        console.log('getUtcDateMinusNowInSeconds(2020-01-17T18:07:30Z)');
        console.log(getDateMinusNowInSeconds('2020-01-17T18:07:30Z'));

        return (
            <ContentPage>
                <h1>Features</h1>

                <br />
                <h3>Routing</h3>
                <div><Link url="/some-page-which-does-not-exist">go to non existing page</Link></div>

                <br />
                <h3>Toasts</h3>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.INFO)}>add an info toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.SUCCESS)}>add a success toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.WARNING)}>add a warning toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.ERROR)}>add an error toast message</FunctionalLink></div>

                <br />
                <h3>Redux</h3>
                <div><FunctionalLink onClick={() => console.log(store.getState())}>print redux state</FunctionalLink></div>
            </ContentPage>
        );
    }
}