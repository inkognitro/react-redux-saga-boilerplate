import React from 'react';
import {ContentPage} from 'SinglePageApp/Layout/UI/PageTypes/ContentPage';
import {FunctionalLink, Link} from 'Common/Layout/UI/Link/Link';
import {store} from "SinglePageApp/App";
import {getSecondsUntilExpiration} from "Common/Auth/Domain/JWTHandling";
import {ToastRepository, ToastRepositoryInterface, ToastTypes} from "Common/Toaster/Domain/ToastRepository";

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDcyMzkwMjIsImV4cCI6MTU4MzIzOTAyMiwic3ViIjoiMTVjZjUwZDgtYzJmYS00ZDZmLTgyMTctMjkzYWRmMzNlNTA5IiwianRpIjoiZjM2OTE4MWEtNjQ5ZS00NjRiLTliZjEtMjk1ZTNhMzI0ODc2In0.ZUwq2yWnT-H3fvpmUJwJkR3sG4aWQGMTo4tP8tNBHrc';

export class Home extends React.Component {
    private readonly toastRepository: ToastRepositoryInterface;

    constructor(props: object) {
        super(props);
        this.toastRepository = new ToastRepository(store.dispatch, () => store.getState().toaster);
    }

    addToast(type: ToastTypes) {
        this.toastRepository.addToastMessage({
            content: 'foo',
            type: type
        });
    }

    logJwtToken() {
        const secondsUntilExpiration = getSecondsUntilExpiration(jwt);
        console.log('secondsUntilExpiration');
        console.log(secondsUntilExpiration);
    }

    render() {
        this.logJwtToken();

        return (
            <ContentPage topDividedContent={true}>
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