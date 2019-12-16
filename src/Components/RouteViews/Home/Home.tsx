import React from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {Link} from 'App/Components/Common/Link/containers/Link';

export default class Home extends React.Component {
    render() {
        return (
            <ContentPage>
                <Link onClick={() => console.log('link clicked!')}>
                    Click here!
                </Link>
            </ContentPage>
        );
    }
}