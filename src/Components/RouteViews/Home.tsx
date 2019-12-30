import React from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {FunctionalLink, Link} from 'App/Components/Common/Link/containers/Link';
import {fetchNewApiTokenForCurrentUser} from "App/Redux/Auth/actions";
import {store} from "App/Redux/root";

export class Home extends React.Component {
    componentDidMount(): void {
        // @ts-ignore
        store.dispatch(fetchNewApiTokenForCurrentUser())//.catch(() => console.log('Home.tsx :: catch'));
    }

    render() {
        return (
            <ContentPage>
                <h1>Home</h1>
                <Link url="/some-page-which-does-not-exist">go to non existing page!</Link>
                <div><FunctionalLink onClick={() => fetchNewApiTokenForCurrentUser()}>handleRequest</FunctionalLink></div>
            </ContentPage>
        );
    }
}