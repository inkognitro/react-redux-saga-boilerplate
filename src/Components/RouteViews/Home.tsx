import React from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {Link} from 'App/Components/Common/Link/containers/Link';

export class Home extends React.Component {
    render() {
        return (
            <ContentPage>
                <h1>Home</h1>
                <Link url="/some-page-which-does-not-exist">go to non existing page!</Link>
            </ContentPage>
        );
    }
}